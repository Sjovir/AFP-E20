import Router from 'koa-router';
import { citizenRouter, citizenChildRouter } from './citizen-router';

const router = new Router({ prefix: '/api' });

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(citizenChildRouter.routes(), citizenChildRouter.allowedMethods());

export default router;
