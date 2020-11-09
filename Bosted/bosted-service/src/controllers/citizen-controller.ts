import { Next, Context } from 'koa';
import { Service } from 'typedi';

import AbstractController from './abstract-controller';
import CitizenService from '../services/citizen-service';
import citizenSchema from '../schemas/citizen-schema';
import ExistsError from '../errors/exists-error';
import LinkedError from '../errors/linked-error';

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
        ctx.response.body = '';
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
      const citizenId = await this.citizenService.createCitizen(citizen);
      ctx.response.status = 201;
      ctx.response.body = { citizenId };

      await next();
    } catch (err) {
      if (err instanceof ExistsError) {
        ctx.throw(400, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

    if (!this.validIdentifiers(ctx, id)) return;
    if (!this.validSchema(ctx, citizenSchema, ctx.request.body)) return;

    const citizen: ICitizen = {
      id,
      ...ctx.request.body,
    };

    try {
      await this.citizenService.updateCitizen(citizen);
      ctx.response.status = 201;
      ctx.response.body = '';

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      await this.citizenService.deleteCitizen(id);
      ctx.response.status = 200;
      ctx.response.body = '';

      await next();
    } catch (err) {
      if (err instanceof LinkedError) {
        ctx.throw(400, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }
}
