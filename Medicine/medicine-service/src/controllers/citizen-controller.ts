import { Context, Next } from 'koa';
import { Service } from 'typedi';

import citizenSchema from '../schemas/citizen-schema';
import CitizenService from '../services/citizen-service';
import AbstractController from './abstract-controller';
import ExistsError from '../errors/exists-error';
import ForeignKeyError from '../errors/foreignkey-error';

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

    try {
      const citizenId = await this.citizenService.createCitizen(
        ctx.request.body
      );
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

    const citizen: ICitizen = { id, ...ctx.request.body };

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
      ctx.response.status = 204;

      await next();
    } catch (err) {
      if (err instanceof ForeignKeyError) {
        ctx.throw(400, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }
}
