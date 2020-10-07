import Router from 'koa-router';

import installationRouter from './installation-router';
import authRouter from './auth-router';

const router = new Router({ prefix: '/api' });
router.use(installationRouter.routes(), installationRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());

export default router;
