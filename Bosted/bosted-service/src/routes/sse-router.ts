import Router from 'koa-router';
import Container from 'typedi';
import CitizenSseController from '../controllers/citizen-sse-controller';

const router = new Router({ prefix: '/sse' });
const controller = Container.get(CitizenSseController);

router.get('/citizens/:citizenUUID', controller.getCitizenEvents);

export default router;
