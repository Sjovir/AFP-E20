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
        const uuid_query_result = await this.citizenModel.getNewUuid();
        const uuid: string = uuid_query_result[0]['UUID()'];
        
        await this.citizenModel.create(citizen, uuid);
        
        return uuid;
    }

    async updateCitizen(citizenUUID: string, citizen: ICitizen) {
        await this.citizenModel.update(citizenUUID, citizen);
    }

    async deleteCitizen(citizenUUID: string) {
        await this.citizenModel.delete(citizenUUID);
    }
}
