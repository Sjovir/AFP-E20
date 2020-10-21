import { Service } from 'typedi';
import OrdinationRepository from '../database/ordination-repository';

@Service()
export default class OrdinationService {
  constructor(private ordinationRepository: OrdinationRepository) {}

  async getOrdination(ordinationUUID: string) {
    return this.ordinationRepository.get(ordinationUUID);
  }

  async getAllOrdinations() {
    return this.ordinationRepository.getAll();
  }

  async createOrdination(ordination: IOrdination) {
    return await this.ordinationRepository.create(ordination);
  }

  async updateOrdination(ordination: IOrdination) {
    await this.ordinationRepository.update(ordination);
  }

  async deleteOrdination(ordinationUUID: string) {
    await this.ordinationRepository.delete(ordinationUUID);
  }
}
