import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';
import CitizenRepository from '../database/citizen-repository';
import ExistsError from '../errors/exists-error';
import ForeignKeyError from '../errors/foreignkey-error';
import {
  createCitizenEvent,
  deleteCitizenEvent,
  updateCitizenEvent,
} from '../kafka/citizen-producer';
import SseService from './sse-service';

@Service()
export default class CitizenService {
  constructor(
    private citizenRepository: CitizenRepository,
    private sseService: SseService
  ) {}

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
      await createCitizenEvent(citizen);

      return result.length > 0 ? result[0].id : null;
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Citizen already exists.');
      }

      throw err;
    }
  }

  async updateCitizen(citizen: ICitizen) {
    if (!citizen.id) throw new Error('No ID found.');

    await this.citizenRepository.update(citizen);
    await updateCitizenEvent(citizen);

    this.sseService.emitCitizenEvent('update', {
      id: citizen.id,
      data: citizen,
    });
  }

  async deleteCitizen(citizenUUID: string) {
    try {
      await this.citizenRepository.delete(citizenUUID);
      await deleteCitizenEvent(citizenUUID);
    } catch (err) {
      if (err.errno === 1451) {
        throw new ForeignKeyError('Citizen is connected to installations.');
      }

      throw err;
    }
  }
}
