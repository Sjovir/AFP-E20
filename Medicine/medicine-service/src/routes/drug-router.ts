import { Container } from 'typedi';
import Router from 'koa-router';

import DrugController from '../controllers/drug-controller';

const router = new Router({ prefix: '/drugs' });

const controller = Container.get(DrugController);

router.get('/', async (ctx, next) => {
  await controller.getAll(ctx, next);
});

router.get('/:citizenUUID', async (ctx, next) => {
  await controller.get(ctx, next);
});

export { router as drugRouter };
