import { Context, Next } from 'koa';
import { Service } from 'typedi';
import ajv from '../schemas/schema-validator';
import { isUUID } from '../utils/uuid-util';
import OrdinationService from '../services/ordination-service';

@Service()
export default class OrdinationController {
  constructor(private ordinationService: OrdinationService) {}

  async getAll(ctx: Context, next: Next) {
    try {
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async get(ctx: Context, next: Next) {
    try {
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async getInstallationsOnUser(ctx: Context, next: Next) {
    try {
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async create(ctx: Context, next: Next) {
    const installation: IInstallation = ctx.request.body;

    const compiled = ajv.compile(null /* INSERT NEW SCHEMA HERE */);
    const valid = compiled(installation);

    if (!valid) {
      ctx.response.body = compiled.errors;
      ctx.response.status = 400;
      return;
    }

    try {
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params;

    if (!isUUID(id)) {
      ctx.response.status = 400;
      ctx.response.body = {
        errors: [
          {
            message: 'The inserted id is not an UUID.',
            code: 'INVALID_IDENTIFIER',
          },
        ],
      };

      return;
    }

    const compiled = ajv.compile(null /* INSERT NEW SCHEMA HERE */);
    const valid = compiled(ctx.request.body);

    if (!valid) {
      ctx.response.body = compiled.errors;
      ctx.response.status = 400;
      return;
    }

    try {
      ctx.response.status = 201;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params; /* params.param */

    if (!isUUID(id)) {
      ctx.response.status = 400;
      ctx.response.body = {
        errors: [
          {
            message: 'The inserted id is not an UUID.',
            code: 'INVALID_IDENTIFIER',
          },
        ],
      };

      return;
    }

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
