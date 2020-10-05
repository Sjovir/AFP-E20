import Router from 'koa-router';
import Container from 'typedi';

import InstallationController from '../controllers/installation-controller';

const router = new Router({ prefix: '/installations' });
const controller = Container.get(InstallationController);

router.get('/', async (ctx, next) => {
    await controller.getAll(ctx, next);
});

router.get('/:installationUUID', async (ctx, next) => {
    await controller.get(ctx, next);
});

router.post('/', async (ctx, next) => {
    await controller.create(ctx, next);
});

router.put('/:installationUUID', async (ctx, next) => {
    await controller.update(ctx, next);
});

router.delete('/', async (ctx, next) => {
    await controller.delete(ctx, next);
});

router.get('/:installationUUID/citizens', async (ctx, next) => {
    await controller.getCitizens(ctx, next);
});

router.post('/:installationUUID/citizens/:citizenUUID', async (ctx, next) => {
    await controller.addCitizen(ctx, next);
});

router.delete('/:installationUUID/citizens/:citizenUUID', async (ctx, next) => {
    await controller.removeCitizen(ctx, next);
});

export default router;
