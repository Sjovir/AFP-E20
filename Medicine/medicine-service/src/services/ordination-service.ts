import { Service } from 'typedi';
import OrdinationRepository from '../database/ordination-repository';

@Service()
export default class OrdinationService {
  // constructor(private ordinationRepository: OrdinationRepository) {}
  //   async getInstallation(ordinationUUID: string) {
  //     return this.ordinationRepository.get(ordinationUUID);
  //   }
  //   async getAllInstallations() {
  //     return this.ordinationRepository.getAll();
  //   }
  //   async getInstallationsOnUser(userUUID: string) {
  //     return this.ordinationRepository.getOnUser(userUUID);
  //   }
  //   async createInstallation(installation: IInstallation) {
  //     await this.ordinationRepository.create(installation);
  //   }
  //   async updateInstallation(
  //     ordinationUUID: string,
  //     installation: IInstallation
  //   ) {
  //     await this.ordinationRepository.update(ordinationUUID, installation);
  //   }
  //   async deleteInstallation(ordinationUUID: string) {
  //     await this.ordinationRepository.delete(ordinationUUID);
  //   }
}
