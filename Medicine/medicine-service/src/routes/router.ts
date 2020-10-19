import Router from 'koa-router';
import citizenRouter from './citizen-router';

const router = new Router({ prefix: '/api' });

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());

export default router;
