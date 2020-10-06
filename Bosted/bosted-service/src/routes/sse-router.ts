import Router from 'koa-router';
import Container from 'typedi';
import SseController from '../controllers/sse-controller';

const router = new Router({ prefix: '/sse' });
const controller = Container.get(SseController);

router.get('/citizens/:citizenUUID', (ctx) => {
  controller.getCitizenEvents(ctx);
});

export default router;
