import Router from 'koa-router';
import { Container } from 'typedi';
import OrdinationController from '../controllers/ordination-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/citizens/:citizenUUID/ordinations' });
const controller = Container.get(OrdinationController);

router
  .get('/', isAuthorized(Permission.MEDICINE_VIEW), controller.getAll)
  .get(
    '/:ordinationUUID',
    isAuthorized(Permission.MEDICINE_VIEW),
    controller.get
  )
  .post('/', isAuthorized(Permission.MEDICINE_EDIT), controller.create)
  .put(
    '/:ordinationUUID',
    isAuthorized(Permission.MEDICINE_EDIT),
    controller.update
  )
  .delete(
    '/:ordinationUUID',
    isAuthorized(Permission.MEDICINE_EDIT),
    controller.delete
  );

export { router as ordinationRouter };
