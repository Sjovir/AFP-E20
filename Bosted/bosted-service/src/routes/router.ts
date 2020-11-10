import Router from 'koa-router';

import logger from '../logger';
import { isAuthenticated } from '../middleware/authentication';
import citizenRouter from './citizen-router';
import installationRouter from './installation-router';

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

router.use(isAuthenticated);

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(installationRouter.routes(), installationRouter.allowedMethods());

export default router;
