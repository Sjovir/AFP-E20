import Router from 'koa-router';
import Container from 'typedi';
import UserController from '../controllers/user-controller';

const controller = Container.get(UserController);
const router = new Router({ prefix: '/users' });

router.get('/username/:username', controller.getOnUsername);

export default router;
