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

    async login(info: ILogin): Promise<ITokens | null> {
        const user = await this.userRepository.find(info.username, info.cpr);

        if (user && bcrypt.compareSync(info.password, user.password_hash)) {
            return {
                accessToken: signAccessToken({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                }),
                refreshToken: signRefreshToken({ userId: user.id }),
            };
        }

        return null;
    }

    async refresh(tokens: IRefresh): Promise<string | null> {
        verify(tokens.refreshToken);

        const refreshTokenDecode = <IDecodedRefreshToken>(
            decode(tokens.refreshToken)
        );

        let newAccessToken = null;

        if (refreshTokenDecode) {
            const user = await this.userRepository.get(
                refreshTokenDecode.userId
            );

            const accessRights = await this.roleRepository.getAccessRightsByUsername(
                refreshTokenDecode.installationId,
                user.username
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

    async updateTokensWithInstallation(
        tokens: ITokens,
        installationUUID: string
    ): Promise<ITokens> {
        verify(tokens.accessToken);
        verify(tokens.refreshToken);

        const accessTokenDecode = <IDecodedAccessToken>(
            decode(tokens.accessToken)
        );

        const accessRights = await this.roleRepository.getAccessRightsByUsername(
            installationUUID,
            accessTokenDecode.username
        );

        const newAccessToken = signAccessToken({
            firstname: accessTokenDecode.firstName,
            lastname: accessTokenDecode.lastName,
            username: accessTokenDecode.username,
            permissions: accessRights,
        });

        const refreshTokenDecode = <IDecodedRefreshToken>(
            decode(tokens.refreshToken)
        );

        const newRefreshToken = signRefreshToken({
            userId: refreshTokenDecode.userId,
            installationId: installationUUID,
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    async getOnUsername(username: string): Promise<IUser> {
        return this.userRepository.find(username, '');
    }
}
