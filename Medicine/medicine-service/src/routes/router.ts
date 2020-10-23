import Router from 'koa-router';
import { citizenRouter, citizenChildRouter } from './citizen-router';
import { drugRouter } from './drug-router';

const router = new Router({ prefix: '/api' });

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(citizenChildRouter.routes(), citizenChildRouter.allowedMethods());
router.use(drugRouter.routes(), drugRouter.allowedMethods());

export default router;
