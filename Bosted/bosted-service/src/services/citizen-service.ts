import CitizenModel from '../database/citizen-model';

export default class CitizenService {
    constructor(private citizenModel: CitizenModel) {}

    async getCitizen(citizenUUID: string) {
        return this.citizenModel.get(citizenUUID);
    }

    async getAllCitizens() {
        return this.citizenModel.getAll();
    }

    async createCitizen(citizen: ICitizen) {
        await this.citizenModel.create(citizen);
    }

    async updateCitizen(citizenUUID: string, citizen: ICitizen) {
        await this.citizenModel.update(citizenUUID, citizen);
    }

    async deleteCitizen(citizenUUID: string) {
        await this.citizenModel.delete(citizenUUID);
    }
}
