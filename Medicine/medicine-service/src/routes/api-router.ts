import Router from 'koa-router';

import { isAuthenticated } from '../middleware/authentication';
import citizenRouter from './citizen-router';
import drugRouter from './drug-router';
import ordinationRouter from './ordination-router';

const router = new Router({ prefix: '/api' });

router.use(isAuthenticated);

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(ordinationRouter.routes(), ordinationRouter.allowedMethods());
router.use(drugRouter.routes(), drugRouter.allowedMethods());

export default router;
