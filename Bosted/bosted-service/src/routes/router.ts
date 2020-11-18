import Router from 'koa-router';

import apiRouter from './api-router';
import sseRouter from './sse-router';

const router = new Router();

router.use(apiRouter.routes(), apiRouter.allowedMethods());
router.use(sseRouter.routes(), sseRouter.allowedMethods());

export default router;
