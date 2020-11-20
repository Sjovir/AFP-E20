import Router from 'koa-router';
import { Container } from 'typedi';
import CitizenController from '../controllers/citizen-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/citizens' });
const controller = Container.get(CitizenController);

router
  .get('/', isAuthorized(Permission.CITIZEN_VIEW), controller.getAll)
  .get('/:citizenUUID', isAuthorized(Permission.CITIZEN_VIEW), controller.get)
  .post('/', isAuthorized(Permission.CITIZEN_EDIT), controller.create)
  .put(
    '/:citizenUUID',
    isAuthorized(Permission.CITIZEN_EDIT),
    controller.update
  )
  .delete(
    '/:citizenUUID',
    isAuthorized(Permission.CITIZEN_EDIT),
    controller.delete
  );

export default router;
