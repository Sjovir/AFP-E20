import Router from 'koa-router';
import { citizenRouter } from './citizen-router';
import { ordinationRouter } from './ordination-router';
import { drugRouter } from './drug-router';

const router = new Router({ prefix: '/api' });

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(ordinationRouter.routes(), ordinationRouter.allowedMethods());
router.use(drugRouter.routes(), drugRouter.allowedMethods());

export default router;
