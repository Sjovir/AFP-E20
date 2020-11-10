import { Context, Next } from 'koa';
import { Service } from 'typedi';
import UserService from '../services/user-service';

@Service()
export default class UserController {
  constructor(private userService: UserService) {}

  async getOnUsername(ctx: Context, next: Next) {
    const username: string = ctx.params.username;

    if (username.length < 2) {
      ctx.throw(400, 'The inserted username is not valid.');
    }

    try {
      const user = await this.userService.getOnUsername(username);
      ctx.response.body = user;
      ctx.response.status = 200;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
