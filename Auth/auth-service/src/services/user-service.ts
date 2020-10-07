import bcrypt from 'bcryptjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { Service } from 'typedi';

import UserRepository from '../database/user-repository';
import RoleRepository from '../database/role-repository';
import {
    verify,
    signAccessToken,
    signRefreshToken,
    decode,
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
                refreshToken: signRefreshToken({}),
            };
        }

        return null;
    }

    async refresh(tokens: IRefresh): Promise<string> {
        let newAccessToken = null;

        // TODO: access token should be expired for refresh to function
        let accessTokenDecode: Record<string, unknown>;
        try {
            accessTokenDecode = <Record<string, unknown>>(
                verify(tokens.accessToken)
            );
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                accessTokenDecode = <Record<string, unknown>>(
                    decode(tokens.accessToken)
                );
            } else {
                throw err;
            }
        }

        verify(tokens.refreshToken);

        if (accessTokenDecode) {
            newAccessToken = signAccessToken({
                firstName: accessTokenDecode.firstName,
                lastName: accessTokenDecode.lastName,
                username: accessTokenDecode.username,
            });
        }

        return newAccessToken;
    }
}
