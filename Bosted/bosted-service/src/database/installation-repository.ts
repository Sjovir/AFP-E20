import { Service } from 'typedi';

import client from '../database/mariadb-client';

@Service()
export default class InstallationRepository {
  async get(uuid: string) {
    return await client.query(
      'SELECT id, name, address FROM Installation WHERE id = ?;',
      [uuid]
    );
  }

  async getAll() {
    return await client.query('SELECT id, name, address FROM Installation;');
  }

  async create(installation: IInstallation) {
    return await client.query(
      `
      INSERT INTO Installation (id, name, address)
      VALUES (?, ?, ?);
      `,
      [installation.id, installation.name, installation.address]
    );
  }

  async update(installation: IInstallation) {
    return await client.query(
      `
      UPDATE Installation
      SET name = ?, address = ?
      WHERE id = ?;
      `,
      [installation.name, installation.address, installation.id]
    );
  }

  async delete(uuid: string) {
    return await client.query('DELETE FROM Installation WHERE id = ?;', [uuid]);
  }

  async getCitizens(installationUUID: string) {
    return await client.query(
      `
      SELECT Citizen.id, first_name as firstName, last_name as lastName, cpr FROM Citizen
      INNER JOIN Installation_Citizen ON citizen_id = Citizen.id
      WHERE installation_id = ?;
      `,
      [installationUUID]
    );
  }

  async addCitizen(citizenUUID: string, installationUUID: string) {
    return await client.query(
      `
      INSERT INTO Installation_Citizen (citizen_id, installation_id)
      VALUES (?, ?);
      `,
      [citizenUUID, installationUUID]
    );
  }

  async removeCitizen(citizenUUID: string, installationUUID: string) {
    return await client.query(
      `
      DELETE FROM Installation_Citizen WHERE citizen_id = ? AND installation_id = ?;
      `,
      [citizenUUID, installationUUID]
    );
  }

  async removeCitizenById(installationCitizenUUID: string) {
    return await client.query(
      `
      DELETE FROM Installation_Citizen WHERE id = ?;
      `,
      [installationCitizenUUID]
    );
  }
}
