import Router from 'koa-router';

import authRouter from './auth-router';
import installationRouter from './installation-router';
import userRouter from './user-router';

const router = new Router({ prefix: '/api' });

router.use(installationRouter.routes(), installationRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
