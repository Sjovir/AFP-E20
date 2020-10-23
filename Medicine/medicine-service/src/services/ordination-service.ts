import { Service } from 'typedi';
import OrdinationRepository from '../database/ordination-repository';
import CitizenRepository from '../database/citizen-repository';

@Service()
export default class OrdinationService {
  constructor(
    private ordinationRepository: OrdinationRepository,
    private citizenRepository: CitizenRepository
  ) {}

  async getOrdination(ordinationUUID: string) {
    return this.ordinationRepository.get(ordinationUUID);
  }

  async getAllOrdinations(citizenUUID: string) {
    return this.ordinationRepository.getAllFromCitizen(citizenUUID);
  }

  async createOrdination(citizenUUID: string, ordination: IOrdination) {
    const ordinationUUID = await this.ordinationRepository.create(ordination);
    await this.citizenRepository.addOrdination(citizenUUID, ordinationUUID);

    return ordinationUUID;
  }

  async updateOrdination(ordination: IOrdination) {
    await this.ordinationRepository.update(ordination);
  }

  async deleteOrdination(citizenUUID: string, ordinationUUID: string) {
    await this.ordinationRepository.delete(ordinationUUID);
    await this.citizenRepository.removeOrdination(citizenUUID, ordinationUUID);
  }
}
