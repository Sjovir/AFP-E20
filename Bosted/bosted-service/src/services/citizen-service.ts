import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import CitizenRepository from '../database/citizen-repository';
import {
  createCitizenEvent,
  updateCitizenEvent,
  deleteCitizenEvent,
} from '../kafka/citizen-producer';
import ExistsError from '../errors/exists-error';
import LinkedError from '../errors/linked-error';

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

    try {
      const result = await this.citizenRepository.create(citizen);
      await createCitizenEvent(citizen);

      return result.length > 0 ? result[0].id : null;
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Citizen already exists.');
      }

      throw err;
    }
  }

  // TODO: maybe dont send the kafka event if update fails, so the sync/data will remain the same.
  async updateCitizen(citizen: ICitizen) {
    if (!citizen.id) throw new Error('No ID found.');

    await this.citizenRepository.update(citizen);
    await updateCitizenEvent(citizen);
  }

  // TODO: maybe dont send the kafka event if delete fails, so the sync/data will remain the same.
  async deleteCitizen(citizenUUID: string) {
    try {
      await this.citizenRepository.delete(citizenUUID);
      await deleteCitizenEvent(citizenUUID);
    } catch (err) {
      if (err.errno === 1451) {
        throw new LinkedError('Citizen is connected to installations.');
      }

      throw err;
    }
  }
}
