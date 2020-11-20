import Router from 'koa-router';
import Container from 'typedi';
import CitizenSseController from '../controllers/citizen-sse-controller';

const router = new Router({ prefix: '/sse' });
const controller = Container.get(CitizenSseController);

router.get('/citizens/:citizenUUID', async (ctx, next) => {
  await controller.getCitizenEvents(ctx, next);
});

export default router;
