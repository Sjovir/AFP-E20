import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import InstallationRepository from '../database/installation-repository';

@Service()
export default class InstallationService {
  constructor(private installationRepository: InstallationRepository) {}

  async getInstallation(installationUUID: string) {
    return this.installationRepository.get(installationUUID);
  }

  async getAllInstallations() {
    return this.installationRepository.getAll();
  }

  async createInstallation(installation: IInstallation) {
    if (!installation.id) installation.id = uuid();

    await this.installationRepository.create(installation);
  }

  async updateInstallation(installation: IInstallation) {
    if (!installation.id) throw new Error('Update Installation needs an ID.');

    await this.installationRepository.update(installation);
  }

  async deleteInstallation(installationUUID: string) {
    await this.installationRepository.delete(installationUUID);
  }

  async getCitizens(installationUUID: string) {
    return await this.installationRepository.getCitizens(installationUUID);
  }

  async addCitizen(citizenUUID: string, installationUUID: string) {
    await this.installationRepository.addCitizen(citizenUUID, installationUUID);
  }

  async removeCitizen(citizenUUID: string, installationUUID: string) {
    await this.installationRepository.removeCitizen(
      citizenUUID,
      installationUUID
    );
  }

  async removeCitizenById(relationshipUUID: string) {
    await this.installationRepository.removeCitizenById(relationshipUUID);
  }
}
