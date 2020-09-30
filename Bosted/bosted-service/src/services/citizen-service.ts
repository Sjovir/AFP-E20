import { Service } from 'typedi';

import CitizenRepository from '../database/citizen-repository';

@Service()
export default class CitizenService {
    constructor(private citizenRepository: CitizenRepository) {
        console.log(citizenRepository);
    }

    async getCitizen(citizenUUID: string) {
        return this.citizenRepository.get(citizenUUID);
    }

    async getAllCitizens() {
        return this.citizenRepository.getAll();
    }

    async createCitizen(citizen: ICitizen) {
        await this.citizenRepository.create(citizen);
    }

    async updateCitizen(citizenUUID: string, citizen: ICitizen) {
        await this.citizenRepository.update(citizenUUID, citizen);
    }

    async deleteCitizen(citizenUUID: string) {
        await this.citizenRepository.delete(citizenUUID);
    }
}
