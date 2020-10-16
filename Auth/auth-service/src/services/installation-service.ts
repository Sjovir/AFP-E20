import { Service } from 'typedi';
import InstallationRepository from '../database/installation-repository';
import RoleRepository from '../database/role-repository';

@Service()
export default class InstallationService {
    constructor(
        private installationRepository: InstallationRepository,
        private roleRepository: RoleRepository
    ) {}

    async getInstallation(installationUUID: string) {
        return this.installationRepository.get(installationUUID);
    }

    async getAllInstallations() {
        return this.installationRepository.getAll();
    }

    async getInstallationsOnUser(userUUID: string) {
        return this.installationRepository.getOnUser(userUUID);
    }

    async createInstallation(installation: IInstallation) {
        await this.installationRepository.create(installation);
    }

    async updateInstallation(
        installationUUID: string,
        installation: IInstallation
    ) {
        await this.installationRepository.update(
            installationUUID,
            installation
        );
    }

    async deleteInstallation(installationUUID: string) {
        await this.installationRepository.delete(installationUUID);
    }

    /////////////////////////////////////////
    // USER ROLES
    /////////////////////////////////////////

    async getAllUsers(installationUUID: string) {
        return this.installationRepository.getAllUsers(installationUUID);
    }

    async addUser(installationUUID: string, userUUID: string) {
        await this.installationRepository.addUser(installationUUID, userUUID);
    }

    async removeUser(installationUUID: string, userUUID: string) {
        await this.installationRepository.removeUser(
            installationUUID,
            userUUID
        );
    }

    async getAllUserRoles(installationUUID: string, userUUID: string) {
        return this.installationRepository.getAllUserRoles(
            installationUUID,
            userUUID
        );
    }

    async addUserRole(
        installationUUID: string,
        userUUID: string,
        roleUUID: string
    ) {
        await this.installationRepository.addUserRole(
            installationUUID,
            userUUID,
            roleUUID
        );
    }

    async removeUserRole(
        installationUUID: string,
        userUUID: string,
        roleUUID: string
    ) {
        await this.installationRepository.removeUserRole(
            installationUUID,
            userUUID,
            roleUUID
        );
    }

    /////////////////////////////////////////
    // ROLES
    /////////////////////////////////////////

    async getAllRoles(installationUUID: string) {
        return this.installationRepository.getAllRoles(installationUUID);
    }

    async addRole(installationUUID: string, title: string) {
        const roleUUID = await this.roleRepository.createRole(title);
        await this.installationRepository.addRole(installationUUID, roleUUID);
    }

    async removeRole(installationUUID: string, roleUUID: string) {
        await this.installationRepository.removeRole(
            installationUUID,
            roleUUID
        );
        await this.roleRepository.deleteRole(roleUUID);
    }
}
