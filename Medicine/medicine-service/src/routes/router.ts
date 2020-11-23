import Router from 'koa-router';

import apiRouter from './api-router';
import heartbeatRouter from './heartbeat-router';

const router = new Router();

router.use(apiRouter.routes(), apiRouter.allowedMethods());
router.use(heartbeatRouter.routes(), heartbeatRouter.allowedMethods());

export default router;
