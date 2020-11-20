import Router from 'koa-router';
import { Container } from 'typedi';
import DrugController from '../controllers/drug-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/drugs' });
const controller = Container.get(DrugController);

router
  .get('/', isAuthorized(Permission.MEDICINE_VIEW), controller.getAll)
  .get('/:citizenUUID', isAuthorized(Permission.MEDICINE_VIEW), controller.get);

export { router as drugRouter };
