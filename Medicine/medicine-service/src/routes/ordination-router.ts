import { Container } from 'typedi';
import Router from 'koa-router';

import OrdinationController from '../controllers/ordination-controller';

const router = new Router({ prefix: '/citizens/:citizenUUID/ordinations' });
const controller = Container.get(OrdinationController);

router.get('/', async (ctx, next) => {
  await controller.getAll(ctx, next);
});

router.get('/:ordinationUUID', async (ctx, next) => {
  await controller.get(ctx, next);
});

router.post('/', async (ctx, next) => {
  await controller.create(ctx, next);
});

router.put('/:ordinationUUID', async (ctx, next) => {
  await controller.update(ctx, next);
});

router.delete('/:ordinationUUID', async (ctx, next) => {
  await controller.delete(ctx, next);
});

export { router as ordinationRouter };
