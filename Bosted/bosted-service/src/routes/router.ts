import Router from 'koa-router';
import ControllerTemplate from '../controllers/controller-template';

const router = new Router({ prefix: '/api' });
const controller = new ControllerTemplate();

router.post('/', async (ctx, next) => {
    controller.post(ctx, next);
});

export default router;
