import InstallationModel from '../database/installation-model';

export default class InstallationService {
    constructor(private installationModel: InstallationModel) {}

    async getInstallation(installationUUID: string) {
        return this.installationModel.get(installationUUID);
    }

    async getAllInstallations() {
        return this.installationModel.getAll();
    }

    async createInstallation(installation: IInstallation) {
        await this.installationModel.create(installation);
    }

    async updateInstallation(
        installationUUID: string,
        installation: IInstallation
    ) {
        await this.installationModel.update(installationUUID, installation);
    }

    async deleteInstallation(installationUUID: string) {
        await this.installationModel.delete(installationUUID);
    }

    async addCitizen(citizenUUID: string, installationUUID: string) {
        await this.installationModel.addCitizen(citizenUUID, installationUUID);
    }

    async removeCitizen(citizenUUID: string, installationUUID: string) {
        await this.installationModel.removeCitizen(
            citizenUUID,
            installationUUID
        );
    }

    async removeCitizenById(relationshipUUID: string) {
        await this.installationModel.removeCitizenById(relationshipUUID);
    }
}
