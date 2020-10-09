import Router from 'koa-router';
import Container from 'typedi';

import InstallationController from '../controllers/installation-controller';
import { isAuthenticated } from '../utils/permission-util';

const controller = Container.get(InstallationController);
const router = new Router({ prefix: '/installations' });
router.use(isAuthenticated);

router.get('/', isAuthenticated, async (ctx, next) => {
    await controller.getAll(ctx, next);
});

router.get('/:installationUUID', async (ctx, next) => {
    await controller.get(ctx, next);
});

router.post('/', async (ctx, next) => {
    await controller.create(ctx, next);
});

router.put('/:installationUUID', async (ctx, next) => {
    await controller.update(ctx, next);
});

router.delete('/', async (ctx, next) => {
    await controller.delete(ctx, next);
});

/* USERS */

router.get('/:installationUUID/users', async (ctx, next) => {
    await controller.getAllUsersFromInstallation(ctx, next);
});

router.post('/:installationUUID/users/:userUUID', async (ctx, next) => {
    await controller.addUserToInstallation(ctx, next);
});

router.delete('/:installationUUID/users/:userUUID', async (ctx, next) => {
    await controller.removeUserFromInstallation(ctx, next);
});

/* USER ROLES */

router.get('/:installationUUID/users/:userUUID/roles', async (ctx, next) => {
    await controller.getUserRolesFromInstallation(ctx, next);
});

router.post(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    async (ctx, next) => {
        await controller.addUserRolesToInstallation(ctx, next);
    }
);

router.delete(
    '/:installationUUID/users/:userUUID/roles/:roleUUID',
    async (ctx, next) => {
        await controller.removeUserRolesFromInstallation(ctx, next);
    }
);

/* ROLES */

router.get('/:installationUUID/roles', async (ctx, next) => {
    await controller.getAllRolesFromInstallation(ctx, next);
});

router.post('/:installationUUID/roles/', async (ctx, next) => {
    await controller.addRoleToInstallation(ctx, next);
});

router.delete('/:installationUUID/roles/:roleUUID', async (ctx, next) => {
    await controller.removeRoleFromInstallation(ctx, next);
});

export default router;
