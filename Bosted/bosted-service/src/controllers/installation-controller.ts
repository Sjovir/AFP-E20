import { Next, Context } from 'koa';
import { Service } from 'typedi';

import AbstractController from './abstract-controller';
import InstallationService from '../services/installation-service';
import installationSchema from '../schemas/installation-schema';
import LinkedError from '../errors/linked-error';
import ExistsError from '../errors/exists-error';

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
        ctx.response.body = '';
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
      await this.installationService.createInstallation(installation);
      ctx.response.status = 201;
      ctx.response.body = '';
      await next();
    } catch (err) {
      ctx.throw(500, err);
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
      await this.installationService.updateInstallation(installation);
      ctx.response.status = 201;
      ctx.response.body = '';
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      await this.installationService.deleteInstallation(id);
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

      ctx.response.status = 201;
      ctx.response.body = '';

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

      ctx.response.status = 201;
      ctx.response.body = '';

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
