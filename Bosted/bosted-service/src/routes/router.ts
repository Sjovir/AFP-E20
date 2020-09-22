import Router from 'koa-router';

import citizenRouter from './citizen-router';
import installationRouter from './installation-router';

const router = new Router({ prefix: '/api' });

router.use(citizenRouter.routes(), citizenRouter.allowedMethods());
router.use(installationRouter.routes(), installationRouter.allowedMethods());

console.log(citizenRouter.prefix);

export default router;
