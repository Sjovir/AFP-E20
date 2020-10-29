import { Service } from 'typedi';
import { uuidv4 as uuid } from 'uuid';

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
    if (!citizen.id) citizen.id = uuid();

    const result = await this.citizenRepository.create(citizen);

    return result.length > 0 ? result[0].id : null;
  }

  async updateCitizen(citizen: ICitizen) {
    if (!citizen.id) throw new Error('No ID found.');

    await this.citizenRepository.update(citizen);
  }

  async deleteCitizen(citizenUUID: string) {
    await this.citizenRepository.delete(citizenUUID);
  }
}
