import { Service } from 'typedi';

import client from '../database/mariadb-client';

@Service()
export default class CitizenRepository {
  async get(uuid: string) {
    return await client.query(
      'SELECT id, first_name as firstName, last_name as lastName, cpr FROM Citizen WHERE id = ?;',
      [uuid]
    );
  }

  async getAll() {
    return await client.query(
      'SELECT id, first_name, last_name, cpr FROM Citizen;'
    );
  }

  async create(citizen: ICitizen, uuid: string) {
    return await client.query(
      `
            INSERT INTO Citizen (id, first_name, last_name, cpr)
            VALUES (?, ?, ?, ?);
            `,
      [uuid, citizen.firstName, citizen.lastName, citizen.cpr]
    );
  }

  async update(uuid: string, citizen: ICitizen) {
    return await client.query(
      `
            UPDATE Citizen
            SET first_name = ?, last_name = ?, cpr = ?
            WHERE id = ?;
            `,
      [citizen.firstName, citizen.lastName, citizen.cpr, uuid]
    );
  }

  async delete(uuid: string) {
    return await client.query('DELETE FROM Citizen WHERE id = ?;', [uuid]);
  }

  async getNewUuid() {
    return await client.query(`SELECT UUID()`);
  }
}
