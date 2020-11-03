import { Context, Next } from 'koa';
import { Service } from 'typedi';

import installationSchema from '../schemas/installation-schema';
import roleSchema from '../schemas/role-schema';
import selectInstallationSchema from '../schemas/select-installation-schema';
import InstallationService from '../services/installation-service';
import UserService from '../services/user-service';
import AbstractController from './abstract-controller';

@Service()
export default class InstallationController extends AbstractController {
  constructor(
    private installationService: InstallationService,
    private userService: UserService
  ) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    try {
      const allInstallations = await this.installationService.getAllInstallations();
      // throw new Error('something happened');
      ctx.response.body = allInstallations;
      await next();
    } catch (err) {
      ctx.response.status = 500;
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
      ctx.response.status = 500;
    }
  }

  async getInstallationsOnUser(ctx: Context, next: Next) {
    const id = ctx.params.userUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const installations = await this.installationService.getInstallationsOnUser(
        id
      );

      ctx.response.body = installations;
      ctx.response.status = 200;

      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async select(ctx: Context, next: Next) {
    const { installationId } = ctx.request.body;

    if (!this.validIdentifiers(ctx, installationId)) return;
    if (!this.validSchema(ctx, selectInstallationSchema, ctx.request.body))
      return;

    const tokens: ITokens = ctx.request.body.tokens;

    try {
      const newTokens: ITokens = await this.userService.updateTokensWithInstallation(
        tokens,
        installationId
      );

      ctx.response.body = newTokens;
      ctx.response.status = 200;

      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async create(ctx: Context, next: Next) {
    if (!this.validSchema(ctx, installationSchema, ctx.request.body)) return;

    const installation: IInstallation = ctx.request.body;

    try {
      await this.installationService.createInstallation(installation);
      ctx.response.status = 201;
      ctx.response.body = '';
      await next();
    } catch (err) {
      ctx.response.status = 500;
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
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async delete(ctx: Context, next: Next) {
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      await this.installationService.deleteInstallation(id);
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

  /////////////////////////////////////////
  // USERS
  /////////////////////////////////////////

  async getAllUsersFromInstallation(ctx: Context, next: Next) {
    const id = ctx.params.installationUUID;

    try {
      const allUsers = await this.installationService.getAllUsers(id);
      ctx.response.body = allUsers;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async addUserToInstallation(ctx: Context, next: Next) {
    const { installationUUID, userUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, userUUID])) return;

    try {
      await this.installationService.addUser(installationUUID, userUUID);
      ctx.response.status = 200;

      await next();
    } catch (err) {
      console.log(err);

      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'Installation has already that user.',
              code: 'USER_EXISTS_ON_INSTALLATION',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }

  async removeUserFromInstallation(ctx: Context, next: Next) {
    const { installationUUID, userUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, userUUID])) return;

    try {
      await this.installationService.removeUser(installationUUID, userUUID);
      ctx.response.status = 200;
      ctx.response.body = '';

      await next();
    } catch (err) {
      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'Installation has already that user.',
              code: 'USER_EXISTS_ON_INSTALLATION',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }

  /////////////////////////////////////////
  // USER ROLES
  /////////////////////////////////////////

  async getUserRolesFromInstallation(ctx: Context, next: Next) {
    const { installationUUID, userUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, userUUID])) return;

    try {
      const allUserRoles = await this.installationService.getAllUserRoles(
        installationUUID,
        userUUID
      );
      ctx.response.body = allUserRoles;
      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }

  async addUserRolesToInstallation(ctx: Context, next: Next) {
    const { installationUUID, userUUID, roleUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, userUUID, roleUUID]))
      return;

    try {
      await this.installationService.addUserRole(
        installationUUID,
        userUUID,
        roleUUID
      );
      ctx.response.status = 200;

      await next();
    } catch (err) {
      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'User has already that role.',
              code: 'ROLE_EXISTS_ON_USER',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }

  async removeUserRolesFromInstallation(ctx: Context, next: Next) {
    const { installationUUID, userUUID, roleUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, userUUID, roleUUID]))
      return;

    try {
      await this.installationService.removeUserRole(
        installationUUID,
        userUUID,
        roleUUID
      );
      ctx.response.status = 200;
      ctx.response.body = '';

      await next();
    } catch (err) {
      if (err.errno === 1062) {
        ctx.response.body = {
          errors: [
            {
              message: 'Installation has already that user.',
              code: 'USER_EXISTS_ON_INSTALLATION',
            },
          ],
        };
      } else {
        ctx.response.status = 500;
      }
    }
  }

  /////////////////////////////////////////
  // ROLES
  /////////////////////////////////////////

  async getAllRolesFromInstallation(ctx: Context, next: Next) {
    const id = ctx.params.installationUUID;

    if (!this.validIdentifiers(ctx, [id])) return;

    try {
      const allRoles = await this.installationService.getAllRoles(id);
      ctx.response.body = allRoles;
      await next();
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
    }
  }

  async addRoleToInstallation(ctx: Context, next: Next) {
    const { installationUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, installationUUID)) return;
    if (!this.validSchema(ctx, roleSchema, ctx.request.body)) return;

    const { title } = ctx.request.body;

    try {
      await this.installationService.addRole(installationUUID, title);
      ctx.response.status = 200;

      await next();
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
    }
  }

  async removeRoleFromInstallation(ctx: Context, next: Next) {
    const { installationUUID, roleUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, [installationUUID, roleUUID])) return;

    try {
      await this.installationService.removeRole(installationUUID, roleUUID);
      ctx.response.status = 200;
      ctx.response.body = '';

      await next();
    } catch (err) {
      ctx.response.status = 500;
    }
  }
}
