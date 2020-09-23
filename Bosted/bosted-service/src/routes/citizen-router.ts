import Router from 'koa-router';

import CitizenController from '../controllers/citizen-controller';
import CitizenService from '../services/citizen-service';
import CitizenModel from '../database/citizen-model';

const router = new Router({ prefix: '/citizens' });
const controller = new CitizenController(
    new CitizenService(new CitizenModel())
);

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
