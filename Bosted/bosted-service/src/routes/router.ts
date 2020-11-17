import Router from 'koa-router';

import { isAuthenticated } from '../middleware/authentication';
import citizenRouter from './citizen-router';
import installationRouter from './installation-router';
import sseRouter from './sse-router';

const router = new Router({ prefix: '/api' });

router.use(isAuthenticated);

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(installationRouter.routes(), installationRouter.allowedMethods());
router.use(sseRouter.routes(), sseRouter.allowedMethods());

export default router;
