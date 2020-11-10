import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import CitizenRepository from '../database/citizen-repository';
import ExistsError from '../errors/exists-error';
import ForeignKeyError from '../errors/foreignkey-error';

// TODO: call bosted service to execute actions on citizen

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

    try {
      const result = await this.citizenRepository.create(citizen);

      return result.length > 0 ? result[0].id : null;
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Citizen already exists.');
      } else {
        throw err;
      }
    }
  }

  async updateCitizen(citizen: ICitizen) {
    if (!citizen.id) throw new Error('No ID found.');

    await this.citizenRepository.update(citizen);
  }

  async deleteCitizen(citizenUUID: string) {
    try {
      await this.citizenRepository.delete(citizenUUID);
    } catch (err) {
      if (err.errno === 1451) {
        throw new ForeignKeyError('Installation is connected to citizens.');
      } else {
        throw err;
      }
    }
  }
}
