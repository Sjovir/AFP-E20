import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import InstallationRepository from '../database/installation-repository';
import ForeignKeyError from '../errors/foreignkey-error';
import ExistsError from '../errors/exists-error';

@Service()
export default class InstallationService {
  constructor(private installationRepository: InstallationRepository) {}

  // TODO: call auth service instead of directly edit the database.

  async getInstallation(installationUUID: string) {
    return this.installationRepository.get(installationUUID);
  }

  async getAllInstallations() {
    return this.installationRepository.getAll();
  }

  async createInstallation(installation: IInstallation) {
    if (!installation.id) installation.id = uuid();

    try {
      await this.installationRepository.create(installation);
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Installation already exists.');
      }

      throw err;
    }
  }

  async updateInstallation(installation: IInstallation) {
    if (!installation.id) throw new Error('Update Installation needs an ID.');

    await this.installationRepository.update(installation);
  }

  async deleteInstallation(installationUUID: string) {
    try {
      await this.installationRepository.delete(installationUUID);
    } catch (err) {
      if (err.errno === 1451) {
        throw new ForeignKeyError('Installation is connected to citizens.');
      }

      throw err;
    }
  }

  async getCitizens(installationUUID: string) {
    return await this.installationRepository.getCitizens(installationUUID);
  }

  async addCitizen(citizenUUID: string, installationUUID: string) {
    try {
      await this.installationRepository.addCitizen(
        citizenUUID,
        installationUUID
      );
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Installation has already that citizen.');
      }

      throw err;
    }
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
