import { Container } from 'typedi';
import Router from 'koa-router';

import ordinationRouter from './ordination-router';
import CitizenController from '../controllers/citizen-controller';

const router = new Router({ prefix: '/citizens' });
const childRouter = new Router({ prefix: '/citizens/:citizenUUID' });

const controller = Container.get(CitizenController);

router.get('/', async (ctx, next) => {
  await controller.getAll(ctx, next);
});

router.get('/:citizenUUID', async (ctx, next) => {
  await controller.get(ctx, next);
});

router.put('/:citizenUUID', async (ctx, next) => {
  await controller.update(ctx, next);
});

router.delete('/:citizenUUID', async (ctx, next) => {
  await controller.delete(ctx, next);
});

childRouter.use(ordinationRouter.routes(), ordinationRouter.allowedMethods());

export { router as citizenRouter, childRouter as citizenChildRouter };
