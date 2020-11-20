import Router from 'koa-router';
import { Container } from 'typedi';
import AuthController from '../controllers/auth-controller';

const authController = Container.get(AuthController);
const router = new Router();

router
  .post('/register', authController.postRegister)
  .post('/login', authController.postLogin)
  .post('/refresh', authController.postRefresh);

export default router;
