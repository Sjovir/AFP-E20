import Router from 'koa-router';
import { Container } from 'typedi';
import CitizenController from '../controllers/citizen-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/citizens' });
const controller = Container.get(CitizenController);

router
  .get('/', isAuthorized(Permission.CITIZEN_VIEW), async (ctx, next) => {
    await controller.getAll(ctx, next);
  })
  .get(
    '/:citizenUUID',
    isAuthorized(Permission.CITIZEN_VIEW),
    async (ctx, next) => {
      await controller.get(ctx, next);
    }
  )
  .post('/', isAuthorized(Permission.CITIZEN_EDIT), async (ctx, next) => {
    await controller.create(ctx, next);
  })
  .put(
    '/:citizenUUID',
    isAuthorized(Permission.CITIZEN_EDIT),
    async (ctx, next) => {
      await controller.update(ctx, next);
    }
  )
  .delete(
    '/:citizenUUID',
    isAuthorized(Permission.CITIZEN_EDIT),
    async (ctx, next) => {
      await controller.delete(ctx, next);
    }
  );

export { router as citizenRouter };
