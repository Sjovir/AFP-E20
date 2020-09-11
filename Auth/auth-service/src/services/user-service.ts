import bcrypt from 'bcryptjs';
import { TokenExpiredError } from 'jsonwebtoken';

import UserDatabase from '../database/user-database';
import RoleDatabase from '../database/role-database';
import {
    verify,
    signAccessToken,
    signRefreshToken,
    decode,
} from '../utils/token';

class UserService {
    constructor(
        private userDatabase: UserDatabase,
        private roleDatabase: RoleDatabase
    ) {}

    async createUser(body: IRegister) {
        const password_hashed = bcrypt.hashSync(
            body.password,
            bcrypt.genSaltSync(10)
        );

        body.password = password_hashed;

        await this.userDatabase.create(body);
    }

    async login(password: string, username?: string, cpr?: string) {
        const user = await this.userDatabase.find(username, cpr);

        if (user && bcrypt.compareSync(password, user.password_hash)) {
            const accessRights = await this.roleDatabase.getAccessRights(
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

    async refresh(accessToken: string, refreshToken: string): Promise<string> {
        let newAccessToken = null;

        // TODO: access token should be expired for refresh to function
        let accessTokenDecode: Record<string, unknown>;
        try {
            accessTokenDecode = <Record<string, unknown>>verify(accessToken);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                accessTokenDecode = <Record<string, unknown>>(
                    decode(accessToken)
                );
            } else {
                throw err;
            }
        }

        verify(refreshToken);

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

export default UserService;
