import Router from 'koa-router';
import { Container } from 'typedi';
import OrdinationController from '../controllers/ordination-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/citizens/:citizenUUID/ordinations' });
const controller = Container.get(OrdinationController);

router.get('/', isAuthorized(Permission.MEDICINE_VIEW), async (ctx, next) => {
  await controller.getAll(ctx, next);
});

router.get(
  '/:ordinationUUID',
  isAuthorized(Permission.MEDICINE_VIEW),
  async (ctx, next) => {
    await controller.get(ctx, next);
  }
);

router.post('/', isAuthorized(Permission.MEDICINE_EDIT), async (ctx, next) => {
  await controller.create(ctx, next);
});

router.put(
  '/:ordinationUUID',
  isAuthorized(Permission.MEDICINE_EDIT),
  async (ctx, next) => {
    await controller.update(ctx, next);
  }
);

router.delete(
  '/:ordinationUUID',
  isAuthorized(Permission.MEDICINE_EDIT),
  async (ctx, next) => {
    await controller.delete(ctx, next);
  }
);

export { router as ordinationRouter };
