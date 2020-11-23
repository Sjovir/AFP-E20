import Router from 'koa-router';

import { isAuthenticated } from '../middleware/authentication';
import citizenRouter from './citizen-router';
import installationRouter from './installation-router';

const router = new Router({ prefix: '/api' });

router.use(isAuthenticated);

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(installationRouter.routes(), installationRouter.allowedMethods());

export default router;
