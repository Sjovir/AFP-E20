import Router from 'koa-router';
import Container from 'typedi';
import InstallationController from '../controllers/installation-controller';
import { isAuthenticated } from '../middleware/authentication';

const controller = Container.get(InstallationController);
const router = new Router({ prefix: '/installations' });
router.use(isAuthenticated);

router
  .get('/', controller.getAll)
  .get('/:installationUUID', controller.get)
  .get('/users/:userUUID', controller.getInstallationsOnUser)
  .post('/select', controller.select)
  .post('/', controller.create)
  .put('/:installationUUID', controller.update)
  .delete('/', controller.delete);

/* USERS */

router
  .get('/:installationUUID/users', controller.getAllUsersFromInstallation)
  .post('/:installationUUID/users/:userUUID', controller.addUserToInstallation)
  .delete(
    '/:installationUUID/users/:userUUID',
    controller.removeUserFromInstallation
  );

/* USER ROLES */

router
  .get(
    '/:installationUUID/users/:userUUID/roles',
    controller.getUserRolesFromInstallation
  )
  .post(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    controller.addUserRolesToInstallation
  )
  .delete(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    controller.removeUserRolesFromInstallation
  );

/* ROLES */

router
  .get('/:installationUUID/roles', controller.getAllRolesFromInstallation)
  .post('/:installationUUID/roles/', controller.addRoleToInstallation)
  .delete(
    '/:installationUUID/roles/:roleUUID',
    controller.removeRoleFromInstallation
  );

export default router;
