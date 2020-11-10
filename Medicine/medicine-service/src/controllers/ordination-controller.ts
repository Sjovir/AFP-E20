import { Context, Next } from 'koa';
import { Service } from 'typedi';

import OrdinationService from '../services/ordination-service';
import ordinationSchema from '../schemas/ordination-schema';
import AbstractController from './abstract-controller';

@Service()
export default class OrdinationController extends AbstractController {
  constructor(private ordinationService: OrdinationService) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    const { citizenUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, citizenUUID)) return;

    try {
      const allOrdinations = await this.ordinationService.getAllOrdinations(
        citizenUUID
      );
      ctx.response.body = allOrdinations;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async get(ctx: Context, next: Next) {
    const id = ctx.params.ordinationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const ordination = await this.ordinationService.getOrdination(id);
      ctx.response.body = ordination;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async create(ctx: Context, next: Next) {
    const { citizenUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, citizenUUID)) return;
    if (!this.validSchema(ctx, ordinationSchema, ctx.request.body)) return;

    const ordination: IOrdination = {
      ...ctx.request.body,
      startDate: new Date(Date.parse(ctx.request.body.startDate)),
      endDate: ctx.request.body.endDate
        ? new Date(Date.parse(ctx.request.body.endDate))
        : null,
    };

    try {
      const ordinationId = await this.ordinationService.createOrdination(
        citizenUUID,
        ordination
      );
      ctx.response.status = 201;
      ctx.response.body = { ordinationId };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params.ordinationUUID;

    if (!this.validIdentifiers(ctx, id)) return;
    if (!this.validSchema(ctx, ordinationSchema, ctx.request.body)) return;

    const ordination: IOrdination = {
      ...ctx.request.body,
      startDate: new Date(Date.parse(ctx.request.body.startDate)),
      endDate: ctx.request.body.endDate
        ? new Date(Date.parse(ctx.request.body.endDate))
        : null,
    };

    try {
      await this.ordinationService.updateOrdination(ordination);
      ctx.response.status = 204;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async delete(ctx: Context, next: Next) {
    const { citizenUUID, ordinationUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [citizenUUID, ordinationUUID])) return;

    try {
      await this.ordinationService.deleteOrdination(
        citizenUUID,
        ordinationUUID
      );
      ctx.response.status = 204;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
