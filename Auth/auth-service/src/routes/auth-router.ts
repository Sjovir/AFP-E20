import Router from 'koa-router';
import { Container } from 'typedi';
import AuthController from '../controllers/auth-controller';

const authController = Container.get(AuthController);
const router = new Router();

router
  .post('/register', async (ctx, next) => {
    await authController.postRegister(ctx, next);
  })
  .post('/login', async (ctx, next) => {
    await authController.postLogin(ctx, next);
  })
  .post('/refresh', async (ctx, next) => {
    await authController.postRefresh(ctx, next);
  });

export default router;
