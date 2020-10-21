import { Context, Next } from 'koa';
import { Service } from 'typedi';
import { validateSchema } from '../schemas/schema-validator';
import { isUUID } from '../utils/uuid-util';
import OrdinationService from '../services/ordination-service';
import ordinationSchema from '../schemas/ordination-schema';
import AbstractController from './abstract-controller';

@Service()
export default class OrdinationController extends AbstractController {
  constructor(private ordinationService: OrdinationService) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    try {
      const allOrdinations = this.ordinationService.getAllOrdinations();
      ctx.response.body = allOrdinations;
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async get(ctx: Context, next: Next) {
    const id = ctx.params.ordinationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const ordination = this.ordinationService.getOrdination(id);
      ctx.response.body = ordination;
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async create(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, ordinationSchema, ctx.params)) return;

    try {
      const ordinationId = this.ordinationService.createOrdination(
        ctx.request.body
      );
      ctx.response.status = 201;
      ctx.response.body = { ordinationId };
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params.ordinationUUID;

    if (!this.validIdentifiers(ctx, id)) return;
    if (!this.validSchema(ctx, ordinationSchema, ctx.request.body)) return;

    const ordination: IOrdination = {
      id,
      ...ctx.request.body,
    };

    try {
      this.ordinationService.updateOrdination(ordination);
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.ordinationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      ctx.response.status = 200;

      await next();
    } catch (err) {
      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'Installation is connected to citizens.',
              code: 'INSTALLATION_IS_CONNECTED',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }
}
