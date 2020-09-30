import { Service } from 'typedi';

import CitizenRepository from '../database/citizen-repository';

@Service()
export default class CitizenService {
    constructor(private citizenRepository: CitizenRepository) {}

    async getCitizen(citizenUUID: string) {
        return this.citizenRepository.get(citizenUUID);
    }

    async getAllCitizens() {
        return this.citizenRepository.getAll();
    }

    async createCitizen(citizen: ICitizen) {
        const uuid_query_result = await this.citizenRepository.getNewUuid();
        const uuid: string = uuid_query_result[0]['UUID()'];
        
        await this.citizenRepository.create(citizen, uuid);
        
        return uuid;
    }

    async updateCitizen(citizenUUID: string, citizen: ICitizen) {
        await this.citizenRepository.update(citizenUUID, citizen);
    }

    async deleteCitizen(citizenUUID: string) {
        await this.citizenRepository.delete(citizenUUID);
    }
}
