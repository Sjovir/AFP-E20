import { Service } from 'typedi';
import client from './mariadb-client';

@Service()
export default class OrdinationRepository {
  async get(uuid: string) {
    const result = await client.query(
      `SELECT id, drug_id, drug_amount as drugAmount, drug_unit as drugUnit, 
        start_date as startDate, end_date as endDate 
      FROM Ordination 
      WHERE id = ?;`,
      [uuid]
    );
    
    return result.length > 0 ? result[0] : null;
  }

  async getAllFromCitizen(citizenUUID: string) {
    return await client.query(
      `SELECT Ordination.id, drug_id, drug_amount as drugAmount, drug_unit as drugUnit, start_date as startDate, end_date as endDate FROM Ordination
      INNER JOIN Citizen_Ordination ON Citizen_Ordination.ordination_id = Ordination.id
      WHERE Citizen_Ordination.citizen_id = ?;`,
      [citizenUUID]
    );
  }

  async getAll() {
    return await client.query(
      'SELECT id, drug_id, drug_amount, drug_unit, start_date, end_date FROM Ordination;'
    );
  }

  async create(ordination: IOrdination): Promise<string | null> {
    const parameters = [
      ordination.drug.id,
      ordination.drugAmount,
      ordination.drugUnit,
      ordination.startDate,
      ordination.endDate,
    ];

    if (ordination.id) parameters.unshift(ordination.id);

    const result = await client.query(
      `
      INSERT INTO Ordination (id, drug_id, drug_amount, drug_unit, start_date, end_date)
      VALUES (${ordination.id ? '?' : 'DEFAULT'}, ?, ?, ?, ?, ?) RETURNING id;
      `,
      [...parameters]
    );

    return result.length > 0 ? result[0].id : null;
  }

  async update(ordination: IOrdination) {
    if (!ordination.id)
      throw new Error('An identifier is required to update an ordination.');

    await client.query(
      `
      UPDATE Ordination
      SET drug_id = ?, drug_amount = ?, drug_unit = ?, start_date = ?, end_date = ?
      WHERE id = ?;
      `,
      [
        ordination.drug.id,
        ordination.drugAmount,
        ordination.drugUnit,
        ordination.startDate,
        ordination.endDate,
        ordination.id,
      ]
    );
  }

  async delete(uuid: string) {
    await client.query('DELETE FROM Ordination WHERE id = ?;', [uuid]);
  }
}
