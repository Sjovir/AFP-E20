import bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import RoleRepository from '../database/role-repository';
import UserRepository from '../database/user-repository';
import {
    decode,
    signAccessToken,
    signRefreshToken,
    verify,
} from '../utils/token';

@Service()
export default class UserService {
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async createUser(body: IRegister) {
        const password_hashed = bcrypt.hashSync(
            body.password,
            bcrypt.genSaltSync(10)
        );

        body.password = password_hashed;

        await this.userRepository.create(body);
    }

    async login(info: ILogin): Promise<IRefresh | null> {
        const user = await this.userRepository.find(info.username, info.cpr);

        if (user && bcrypt.compareSync(info.password, user.password_hash)) {
            const accessRights = await this.roleRepository.getAccessRightsByUserId(
                user.id
            );

            return {
                accessToken: signAccessToken({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                    permissions: accessRights,
                }),
                refreshToken: signRefreshToken({ id: user.id }),
            };
        }

        return null;
    }

    async refresh(tokens: IRefresh): Promise<string> {
        verify(tokens.refreshToken);

        const refreshTokenDecode = <Record<string, unknown>>(
            decode(tokens.refreshToken)
        );

        let newAccessToken = null;

        if (refreshTokenDecode) {
            const user = await this.userRepository.get(
                <string>refreshTokenDecode.id
            );

            const accessRights = await this.roleRepository.getAccessRightsByUserId(
                <string>refreshTokenDecode.id
            );

            newAccessToken = signAccessToken({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                permissions: accessRights,
            });
        }

        return newAccessToken;
    }
}
