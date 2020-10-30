import Router from 'koa-router';
import Container from 'typedi';
import InstallationController from '../controllers/installation-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/installations' });
const controller = Container.get(InstallationController);

router.get(
  '/',
  isAuthorized(Permission.INSTALLATION_VIEW),
  async (ctx, next) => {
    await controller.getAll(ctx, next);
  }
);

router.get(
  '/:installationUUID',
  isAuthorized(Permission.INSTALLATION_VIEW),
  async (ctx, next) => {
    await controller.get(ctx, next);
  }
);

router.post(
  '/',
  isAuthorized(Permission.INSTALLATION_EDIT),
  async (ctx, next) => {
    await controller.create(ctx, next);
  }
);

router.put(
  '/:installationUUID',
  isAuthorized(Permission.INSTALLATION_EDIT),
  async (ctx, next) => {
    await controller.update(ctx, next);
  }
);

router.delete(
  '/',
  isAuthorized(Permission.INSTALLATION_EDIT),
  async (ctx, next) => {
    await controller.delete(ctx, next);
  }
);

router.get(
  '/:installationUUID/citizens',
  isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_VIEW]),
  async (ctx, next) => {
    await controller.getCitizens(ctx, next);
  }
);

router.post(
  '/:installationUUID/citizens/:citizenUUID',
  isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
  async (ctx, next) => {
    await controller.addCitizen(ctx, next);
  }
);

router.delete(
  '/:installationUUID/citizens/:citizenUUID',
  isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
  async (ctx, next) => {
    await controller.removeCitizen(ctx, next);
  }
);

export default router;
