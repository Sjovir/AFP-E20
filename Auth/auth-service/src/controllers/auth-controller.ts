import { Next, Context } from 'koa';

import UserService from '../services/user-service';

export interface RegisterBody {
    firstName: string;
    lastName: string;
    cpr: string;
    username: string;
    password: string;
}

export interface LoginBody {
    cpr?: string;
    username?: string;
    password: string;
}

class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async postRegister(ctx: Context, next: Next) {
        const body: RegisterBody = ctx.request.body;

        try {
            await this.userService.createUser(body);

            ctx.response.status = 200;
        } catch (err) {
            ctx.response.status = 400;

            if (err.errno === 1062) {
                ctx.response.body = {
                    name: 'CPR or Username is already in use.',
                    code: 'CPR_OR_USERNAME_IN_USE',
                };
            } else {
                ctx.response.body = {
                    name: 'Something went wrong in the server.',
                    code: 'INTERNAL_SERVER_ERROR',
                };
            }
        }

        next();
    }

    async postLogin(ctx: Context, next: Next) {
        const { cpr, username }: LoginBody = ctx.request.body;

        ctx.response.status = 400;

        if (cpr && username) {
            ctx.response.body = {
                message: 'Use either CPR or Username to log in.',
                code: 'CPR_XOR_USERNAME_LOGIN',
            };

            return;
        }

        const token = await this.userService.login(ctx.request.body);

        if (token) {
            ctx.response.body = token;
            ctx.response.status = 200;
        } else {
            ctx.response.body = {
                message: 'Account with given credentials do not exist.',
                code: 'ACCOUNT_NOT_EXISTS',
            };
        }

        next();
    }

    async postRefresh(ctx: Context, _next: Next) {
        const { accessToken, refreshToken } = ctx.request.body;

        const newAccessToken = await this.userService.refresh(
            accessToken,
            refreshToken
        );

        if (newAccessToken) {
            ctx.response.status = 200;

            ctx.response.body = {
                accessToken: newAccessToken,
            };
        } else {
            ctx.response.status = 401;
        }
    }
}

export default AuthController;
