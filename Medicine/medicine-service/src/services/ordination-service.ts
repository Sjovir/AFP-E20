import { Service } from 'typedi';
import CitizenRepository from '../database/citizen-repository';
import DrugRepository from '../database/drug-repository';
import OrdinationRepository from '../database/ordination-repository';
import ExistsError from '../errors/exists-error';

@Service()
export default class OrdinationService {
  constructor(
    private ordinationRepository: OrdinationRepository,
    private citizenRepository: CitizenRepository,
    private drugRepository: DrugRepository
  ) {}

  async getOrdination(ordinationUUID: string) {
    const ordination = await this.ordinationRepository.get(ordinationUUID);
    await this.mergeDrugIntoOrdinations([ordination]);

    return ordination;
  }

  async getAllOrdinations(citizenUUID: string) {
    const ordinations = await this.ordinationRepository.getAllFromCitizen(
      citizenUUID
    );
    await this.mergeDrugIntoOrdinations(ordinations);

    return ordinations;
  }

  async createOrdination(citizenUUID: string, ordination: IOrdination) {
    try {
      const ordinationUUID = await this.ordinationRepository.create(ordination);
      await this.citizenRepository.addOrdination(citizenUUID, ordinationUUID);

      return ordinationUUID;
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('Ordination already exists.');
      } else {
        throw err;
      }
    }
  }

  async updateOrdination(ordination: IOrdination) {
    await this.ordinationRepository.update(ordination);
  }

  async deleteOrdination(citizenUUID: string, ordinationUUID: string) {
    await this.ordinationRepository.delete(ordinationUUID);
    await this.citizenRepository.removeOrdination(citizenUUID, ordinationUUID);
  }

  // TODO: needs arg type
  async mergeDrugIntoOrdinations(ordinations) {
    const drugs: IDrug[] = await this.drugRepository.getAll();

    for (const ordination of ordinations) {
      ordination.drug = drugs.find((drug) => drug.id === ordination.drug_id);
    }
  }
}
