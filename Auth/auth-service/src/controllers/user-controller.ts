import { Context, Next } from 'koa';
import { Service } from 'typedi';
import UserService from '../services/user-service';

@Service()
export default class UserController {
    constructor(private userService: UserService) {}

    async getOnUsername(ctx: Context, next: Next) {
        const username: string = ctx.params.username;

        if (username.length < 2) {
            ctx.response.status = 400;
            ctx.response.body = {
                errors: [
                    {
                        message: 'The inserted username is not valid.',
                        code: 'INVALID_USERNAME',
                    },
                ],
            };

            return;
        }

        try {
            const user = await this.userService.getOnUsername(username);

            ctx.response.body = user;
            ctx.response.status = 200;

            await next();
        } catch (err) {
            ctx.response.status = 500;
        }
    }
}
