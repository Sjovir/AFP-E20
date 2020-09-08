import bcrypt from 'bcryptjs';
import { TokenExpiredError } from 'jsonwebtoken';

import UserDatabase from '../database/user-database';
import { RegisterBody, LoginBody } from '../controllers/auth-controller';
import {
    verify,
    signAccessToken,
    signRefreshToken,
    decode,
} from '../utils/token';

class UserService {
    private userDatabase: UserDatabase;

    constructor() {
        this.userDatabase = new UserDatabase();
    }

    async createUser(body: RegisterBody) {
        const password_hashed = bcrypt.hashSync(
            body.password,
            bcrypt.genSaltSync(10)
        );

        body.password = password_hashed;

        await this.userDatabase.create(body);
    }

    async login(body: LoginBody) {
        const user = await this.userDatabase.find(body.username, body.cpr);

        if (user && bcrypt.compareSync(body.password, user.password_hash)) {
            return {
                accessToken: signAccessToken({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                }),
                refreshToken: signRefreshToken({}),
            };
        }

        return null;
    }

    async refresh(accessToken: string, refreshToken: string) {
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
