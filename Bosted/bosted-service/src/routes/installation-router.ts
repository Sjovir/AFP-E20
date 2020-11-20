import Router from 'koa-router';
import Container from 'typedi';
import InstallationController from '../controllers/installation-controller';
import { isAuthorized } from '../middleware/authorization';

const router = new Router({ prefix: '/installations' });
const controller = Container.get(InstallationController);

router
  .get('/', isAuthorized(Permission.INSTALLATION_VIEW), controller.getAll)
  .get(
    '/:installationUUID',
    isAuthorized(Permission.INSTALLATION_VIEW),
    controller.get
  )
  .post('/', isAuthorized(Permission.INSTALLATION_EDIT), controller.create)
  .put(
    '/:installationUUID',
    isAuthorized(Permission.INSTALLATION_EDIT),
    controller.update
  )
  .delete('/', isAuthorized(Permission.INSTALLATION_EDIT), controller.delete)
  .get(
    '/:installationUUID/citizens',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_VIEW]),
    controller.getCitizens
  )
  .post(
    '/:installationUUID/citizens/:citizenUUID',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
    controller.addCitizen
  )
  .delete(
    '/:installationUUID/citizens/:citizenUUID',
    isAuthorized([Permission.INSTALLATION_VIEW, Permission.CITIZEN_EDIT]),
    controller.removeCitizen
  );

export default router;
