import Router from 'koa-router';

import logger from '../logger';
import authRouter from './auth-router';
import installationRouter from './installation-router';
import userRouter from './user-router';

const router = new Router({ prefix: '/api' });

router.use(async (ctx, next) => {
  const { request, response } = ctx;

  const requestMetadata = {
    method: request.method,
    url: request.url,
    header: request.header,
    ...(Object.keys(ctx.params).length > 0 ? { params: ctx.params } : {}),
    ...(Object.keys(request.body).length > 0 ? { body: request.body } : {}),
  };

  logger.info(`request: ${ctx.request.url}`, requestMetadata);

  await next();

  const responseMetadata = {
    header: response.headers,
    status: response.status,
    body: response.body,
    length: response.length,
    type: response.type,
  };

  logger.info(`response: ${ctx.request.url}`, responseMetadata);
});

router.use(installationRouter.routes(), installationRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
