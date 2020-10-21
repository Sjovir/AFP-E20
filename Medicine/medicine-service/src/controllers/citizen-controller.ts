import { Next, Context } from 'koa';
import { Service } from 'typedi';

import ajv from '../schemas/schema-validator';
import { isUUID } from '../utils/uuid-util';
import CitizenService from '../services/citizen-service';
import citizenSchema from '../schemas/citizen-schema';
import AbstractController from './abstract-controller';

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
      ctx.response.body = 500;
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
      ctx.response.body = 500;
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
      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'Citizen exists already.',
              code: 'CITIZEN_EXISTS',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }

  async update(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

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

    const citizen: ICitizen = ctx.request.body;

    const compiled = ajv.compile(citizenSchema);
    const valid = compiled(citizen);

    if (!valid) {
      ctx.response.body = compiled.errors;
      ctx.response.status = 400;
      return;
    }

    try {
      await this.citizenService.updateCitizen(id, citizen);
      ctx.response.status = 201;
      ctx.response.body = '';

      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;

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
      await this.citizenService.deleteCitizen(id);
      ctx.response.status = 200;
      ctx.response.body = '';

      await next();
    } catch (err) {
      if (err.errno === 1451) {
        ctx.response.body = {
          errors: [
            {
              message: 'Citizen is connected to installations.',
              code: 'CITIZEN_IS_CONNECTED',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }
}
