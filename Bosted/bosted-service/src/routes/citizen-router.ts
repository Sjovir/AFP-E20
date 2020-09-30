import { Container } from 'typedi';
import Router from 'koa-router';

import CitizenController from '../controllers/citizen-controller';

const router = new Router({ prefix: '/citizens' });
const controller = Container.get(CitizenController);

router.get('/', async (ctx, next) => {
    await controller.getAll(ctx, next);
});

router.get('/:citizenUUID', async (ctx, next) => {
    await controller.get(ctx, next);
});

router.post('/', async (ctx, next) => {
    await controller.create(ctx, next);
});

router.put('/:citizenUUID', async (ctx, next) => {
    await controller.update(ctx, next);
});

router.delete('/:citizenUUID', async (ctx, next) => {
    await controller.delete(ctx, next);
});

export default router;
