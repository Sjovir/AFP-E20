import Router from 'koa-router';
import Container from 'typedi';
import InstallationController from '../controllers/installation-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/installations' });
const controller = Container.get(InstallationController);

router
  .get('/', isAuthorized(Permission.INSTALLATION_VIEW), async (ctx, next) => {
    await controller.getAll(ctx, next);
  })
  .get(
    '/:installationUUID',
    isAuthorized(Permission.INSTALLATION_VIEW),
    async (ctx, next) => {
      await controller.get(ctx, next);
    }
  )
  .post('/', isAuthorized(Permission.INSTALLATION_EDIT), async (ctx, next) => {
    await controller.create(ctx, next);
  })
  .put(
    '/:installationUUID',
    isAuthorized(Permission.INSTALLATION_EDIT),
    async (ctx, next) => {
      await controller.update(ctx, next);
    }
  )
  .delete(
    '/',
    isAuthorized(Permission.INSTALLATION_EDIT),
    async (ctx, next) => {
      await controller.delete(ctx, next);
    }
  )
  .get(
    '/:installationUUID/citizens',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_VIEW]),
    async (ctx, next) => {
      await controller.getCitizens(ctx, next);
    }
  )
  .post(
    '/:installationUUID/citizens/:citizenUUID',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
    async (ctx, next) => {
      await controller.addCitizen(ctx, next);
    }
  )
  .delete(
    '/:installationUUID/citizens/:citizenUUID',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
    async (ctx, next) => {
      await controller.removeCitizen(ctx, next);
    }
  );

export default router;
