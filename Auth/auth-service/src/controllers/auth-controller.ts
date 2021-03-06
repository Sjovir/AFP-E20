import { Next, Context } from 'koa';
import { Service } from 'typedi';

import AbstractController from './abstract-controller';
import UserService from '../services/user-service';
import registerSchema from '../schemas/register-schema';
import loginSchema from '../schemas/login-schema';
import refreshSchema from '../schemas/refresh-schema';
import ExistsError from '../errors/exists-error';
import { JsonWebTokenError } from 'jsonwebtoken';

@Service()
export default class AuthController extends AbstractController {
  constructor(private userService: UserService) {
    super();
  }

  async postRegister(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, registerSchema, ctx.request.body)) return;

    const body: IRegister = ctx.request.body;

    try {
      await this.userService.createUser(body);
      ctx.response.status = 201;
      ctx.response.body = { username: body.username };
    } catch (err) {
      if (err instanceof ExistsError) {
        ctx.throw(400, 'CPR or Username is already in use.');
      } else {
        ctx.throw(500, err);
      }
    }

    await next();
  }

  async postLogin(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, loginSchema, ctx.request.body)) return;

    const { cpr, username, password }: ILogin = ctx.request.body;

    let token: ITokens;
    try {
      token = await this.userService.login({ password, username, cpr });
    } catch (err) {
      ctx.throw(500, err);
    }

    if (token) {
      ctx.response.status = 200;
      ctx.response.body = token;
    } else {
      ctx.throw(400, 'Account with given credentials do not exist.');
    }

    await next();
  }

  async postRefresh(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, refreshSchema, ctx.request.body)) return;

    const tokens: IRefresh = ctx.request.body;

    let newAccessToken: string;
    try {
      newAccessToken = await this.userService.refresh(tokens);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        ctx.throw(401, err);
      } else {
        ctx.throw(500, err);
      }
    }

    ctx.response.status = 200;
    ctx.response.body = {
      accessToken: newAccessToken,
    };

    await next();
  }
}
