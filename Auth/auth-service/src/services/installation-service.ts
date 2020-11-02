import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import InstallationRepository from '../database/installation-repository';
import RoleRepository from '../database/role-repository';
import {
  createInstallationEvent,
  updateInstallationEvent,
  deleteInstallationEvent,
} from '../kafka/installation-producer';

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
    if (!installation.id) installation.id = uuid();

    //await this.installationRepository.create(installation);
    await createInstallationEvent(installation);
  }

  async updateInstallation(installation: IInstallation) {
    if (!installation.id) throw new Error('Update Installation needs an ID.');

    await this.installationRepository.update(installation);
    await updateInstallationEvent(installation);
  }

  async deleteInstallation(installationUUID: string) {
    await this.installationRepository.delete(installationUUID);
    await deleteInstallationEvent(installationUUID);
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
    await this.installationRepository.removeUser(installationUUID, userUUID);
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
    await this.installationRepository.removeRole(installationUUID, roleUUID);
    await this.roleRepository.deleteRole(roleUUID);
  }
}
