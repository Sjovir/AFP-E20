import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import CitizenRepository from '../database/citizen-repository';
import {
  createCitizenEvent,
  updateCitizenEvent,
  deleteCitizenEvent,
} from '../kafka/citizen-producer';

@Service()
export default class CitizenService {
  constructor(private citizenRepository: CitizenRepository) {}

  async getCitizen(citizenUUID: string) {
    return this.citizenRepository.get(citizenUUID);
  }

  async getAllCitizens() {
    return this.citizenRepository.getAll();
  }

  // TODO: maybe dont send the kafka event if create fails, so the sync/data will remain the same.
  async createCitizen(citizen: ICitizen) {
    if (!citizen.id) citizen.id = uuid();

    const result = await this.citizenRepository.create(citizen);
    await createCitizenEvent(citizen);

    return result.length > 0 ? result[0].id : null;
  }

  // TODO: maybe dont send the kafka event if update fails, so the sync/data will remain the same.
  async updateCitizen(citizen: ICitizen) {
    if (!citizen.id) throw new Error('No ID found.');

    await this.citizenRepository.update(citizen);
    await updateCitizenEvent(citizen);
  }

  // TODO: maybe dont send the kafka event if delete fails, so the sync/data will remain the same.
  async deleteCitizen(citizenUUID: string) {
    await this.citizenRepository.delete(citizenUUID);
    await deleteCitizenEvent(citizenUUID);
  }
}
