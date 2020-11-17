import { Next, Context } from 'koa';
import { Service } from 'typedi';

import AbstractController from './abstract-controller';
import InstallationService from '../services/installation-service';
import installationSchema from '../schemas/installation-schema';
import ExistsError from '../errors/exists-error';

const AUTH_URL = `http://${process.env.AUTH_SERVICE || 'localhost'}:${
  process.env.AUTH_PORT || 7000
}/api/installations/`;

@Service()
export default class InstallationController extends AbstractController {
  constructor(private installationService: InstallationService) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    try {
      const allInstallations = await this.installationService.getAllInstallations();
      ctx.response.body = allInstallations;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async get(ctx: Context, next: Next) {
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const installation = await this.installationService.getInstallation(id);

      if (installation && installation.length > 0) {
        ctx.response.body = installation[0];
      } else {
        ctx.response.body = null;
      }
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async create(ctx: Context, next: Next) {
    const installation: IInstallation = ctx.request.body;

    if (!this.validSchema(ctx, installationSchema, ctx.request.body)) return;

    try {
      const result = await ctx.axios.post(AUTH_URL, installation);
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
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, id)) return;
    if (!this.validSchema(ctx, installationSchema, ctx.request.body)) return;

    const installation: IInstallation = {
      id,
      ...ctx.request.body,
    };

    try {
      const result = await ctx.axios.put(AUTH_URL, installation);
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
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const result = await ctx.axios.delete(AUTH_URL, {
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

  async getCitizens(ctx: Context, next: Next) {
    const { installationUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, installationUUID)) return;

    try {
      const installationCitizens = await this.installationService.getCitizens(
        installationUUID
      );

      ctx.response.body = installationCitizens;
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async addCitizen(ctx: Context, next: Next) {
    const { installationUUID, citizenUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, citizenUUID])) return;

    try {
      await this.installationService.addCitizen(citizenUUID, installationUUID);

      ctx.response.status = 204;

      await next();
    } catch (err) {
      if (err instanceof ExistsError) {
        ctx.throw(400, err);
      } else {
        ctx.throw(500, err);
      }
    }
  }

  async removeCitizen(ctx: Context, next: Next) {
    const { installationUUID, citizenUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, citizenUUID])) return;

    try {
      await this.installationService.removeCitizen(
        citizenUUID,
        installationUUID
      );

      ctx.response.status = 204;

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
