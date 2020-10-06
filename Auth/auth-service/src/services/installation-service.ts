import { Service } from 'typedi';

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
}
