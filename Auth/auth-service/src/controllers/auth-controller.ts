import { Next, Context } from 'koa';

import UserService from '../services/user-service';
import UserDatabase from '../database/user-database';
import RoleDatabase from '../database/role-database';

import ajv from '../schemas/schema-validator';
import registerSchema from '../schemas/register-schema';
import loginSchema from '../schemas/login-schema';
import refreshSchema from '../schemas/refresh-schema';

class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(
            new UserDatabase(),
            new RoleDatabase()
        );
    }

    async postRegister(ctx: Context, next: Next) {
        const compiled = ajv.compile(registerSchema);
        const valid = compiled(ctx.request.body);

        if (!valid) {
            ctx.response.body = compiled.errors;
            ctx.response.status = 400;
            return;
        }

        const body: IRegister = ctx.request.body;

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
        const compiled = ajv.compile(loginSchema);
        const valid = compiled(ctx.request.body);

        if (!valid) {
            ctx.response.body = compiled.errors;
            ctx.response.status = 400;
            return;
        }

        const { cpr, username, password }: ILogin = ctx.request.body;

        ctx.response.status = 400;

        if (cpr && username) {
            ctx.response.body = {
                message: 'Use either CPR or Username to log in.',
                code: 'CPR_XOR_USERNAME_LOGIN',
            };

            return;
        }

        const token = await this.userService.login({ password, username, cpr });

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

    async postRefresh(ctx: Context, next: Next) {
        const compiled = ajv.compile(refreshSchema);
        const valid = compiled(ctx.request.body);

        if (!valid) {
            ctx.response.body = compiled.errors;
            ctx.response.status = 400;
            return;
        }

        const tokens: IRefresh = ctx.request.body;

        try {
            const newAccessToken = await this.userService.refresh(tokens);

            if (newAccessToken) {
                ctx.response.status = 200;

                ctx.response.body = {
                    accessToken: newAccessToken,
                };
            } else {
                ctx.response.status = 401;
            }
        } catch (err) {
            ctx.response.body = err;
            ctx.response.status = 401;
        }

        next();
    }
}

export default AuthController;
