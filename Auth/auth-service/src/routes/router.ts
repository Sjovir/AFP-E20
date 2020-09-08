import Router from 'koa-router';

import AuthController from '../controllers/auth-controller';

const router = new Router({ prefix: '/api' });
const authController = new AuthController();

router.post('/register', async (ctx, next) => {
    await authController.postRegister(ctx, next);
});

router.post('/login', async (ctx, next) => {
    await authController.postLogin(ctx, next);
});

router.post('/refresh', async (ctx, next) => {
    await authController.postRefresh(ctx, next);
});

export default router;
