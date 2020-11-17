import { Context, Next } from 'koa';
import { Service } from 'typedi';

import citizenSchema from '../schemas/citizen-schema';
import CitizenService from '../services/citizen-service';
import AbstractController from './abstract-controller';

const BOSTED_URL = `http://${process.env.BOSTED_SERVICE}:${process.env.BOSTED_PORT}/api/citizens/`;

@Service()
export default class CitizenController extends AbstractController {
  constructor(private citizenService: CitizenService) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    try {
      const allCitizens = await this.citizenService.getAllCitizens();
      ctx.response.body = allCitizens;

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async get(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const citizen = await this.citizenService.getCitizen(id);
      if (citizen && citizen.length > 0) {
        ctx.response.body = citizen[0];
      } else {
        ctx.response.status = 204;
      }

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async create(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, citizenSchema, ctx.request.body)) return;

    const citizen: ICitizen = ctx.request.body;

    try {
      const result = await ctx.axios.post(BOSTED_URL, citizen);
      ctx.response.status = result.status;
      ctx.response.body = result.data;

      await next();
    } catch (err) {
      if (err.response.status < 500) {
        ctx.throw(err.response.status, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

    if (!this.validIdentifiers(ctx, id)) return;
    if (!this.validSchema(ctx, citizenSchema, ctx.request.body)) return;

    const citizen: ICitizen = { id, ...ctx.request.body };

    try {
      const result = await ctx.axios.put(BOSTED_URL, citizen);
      ctx.response.status = result.status;
      ctx.response.body = result.data;

      await next();
    } catch (err) {
      if (err.response.status < 500) {
        ctx.throw(err.response.status, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const result = await ctx.axios.put(BOSTED_URL, {
        params: ctx.params,
      });
      ctx.response.status = result.status;
      ctx.response.body = result.data;

      await next();
    } catch (err) {
      if (err.response.status < 500) {
        ctx.throw(err.response.status, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }
}
