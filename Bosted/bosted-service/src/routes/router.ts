import Router from 'koa-router';
import apiRouter from './api-router';
import heartbeatRouter from './heartbeat-router';
import sseRouter from './sse-router';

const router = new Router();

router.use(apiRouter.routes(), apiRouter.allowedMethods());
router.use(sseRouter.routes(), sseRouter.allowedMethods());
router.use(heartbeatRouter.routes(), heartbeatRouter.allowedMethods());

export default router;
