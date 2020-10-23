import { Service } from 'typedi';

import client from '../database/mariadb-client';

@Service()
export default class DrugRepository {
  async get(uuid: string) {
    return await client.query('SELECT id, name, code FROM Drug WHERE id = ?;', [
      uuid,
    ]);
  }

  async getAll() {
    return await client.query('SELECT id, name, code FROM Drug;');
  }
}
