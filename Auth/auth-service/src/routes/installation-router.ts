import Router from 'koa-router';
import Container from 'typedi';
import InstallationController from '../controllers/installation-controller';
import { isAuthenticated } from '../middleware/authentication';

const controller = Container.get(InstallationController);
const router = new Router({ prefix: '/installations' });
router.use(isAuthenticated);

router
  .get('/', async (ctx, next) => {
    await controller.getAll(ctx, next);
  })
  .get('/:installationUUID', async (ctx, next) => {
    await controller.get(ctx, next);
  })
  .get('/users/:userUUID', async (ctx, next) => {
    await controller.getInstallationsOnUser(ctx, next);
  })
  .post('/select', async (ctx, next) => {
    await controller.select(ctx, next);
  })
  .post('/', async (ctx, next) => {
    await controller.create(ctx, next);
  })
  .put('/:installationUUID', async (ctx, next) => {
    await controller.update(ctx, next);
  })
  .delete('/', async (ctx, next) => {
    await controller.delete(ctx, next);
  });

/* USERS */

router
  .get('/:installationUUID/users', async (ctx, next) => {
    await controller.getAllUsersFromInstallation(ctx, next);
  })
  .post('/:installationUUID/users/:userUUID', async (ctx, next) => {
    await controller.addUserToInstallation(ctx, next);
  })
  .delete('/:installationUUID/users/:userUUID', async (ctx, next) => {
    await controller.removeUserFromInstallation(ctx, next);
  });

/* USER ROLES */

router
  .get('/:installationUUID/users/:userUUID/roles', async (ctx, next) => {
    await controller.getUserRolesFromInstallation(ctx, next);
  })
  .post(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    async (ctx, next) => {
      await controller.addUserRolesToInstallation(ctx, next);
    }
  )
  .delete(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    async (ctx, next) => {
      await controller.removeUserRolesFromInstallation(ctx, next);
    }
  );

/* ROLES */

router
  .get('/:installationUUID/roles', async (ctx, next) => {
    await controller.getAllRolesFromInstallation(ctx, next);
  })
  .post('/:installationUUID/roles/', async (ctx, next) => {
    await controller.addRoleToInstallation(ctx, next);
  })
  .delete('/:installationUUID/roles/:roleUUID', async (ctx, next) => {
    await controller.removeRoleFromInstallation(ctx, next);
  });

export default router;
