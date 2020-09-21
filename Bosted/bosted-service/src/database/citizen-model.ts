import pool from './connector';

export default class CitizenModel {
    async get(uuid: string) {
        return await pool.query(
            'SELECT id, first_name, last_name, cpr FROM Citizen WHERE id = ?;',
            [uuid]
        );
    }

    async getAll() {
        return await pool.query(
            'SELECT id, first_name, last_name, cpr FROM Citizen;'
        );
    }

    async create(citizen: ICitizen) {
        return await pool.query(
            `
            INSERT INTO Citizen (id, first_name, last_name, cpr)
            VALUES (uuid(), ?, ?, ?);
            `,
            [citizen.firstName, citizen.lastName, citizen.cpr]
        );
    }

    async update(uuid: string, citizen: Partial<ICitizen>) {
        return await pool.query(
            `
            UPDATE Citizen
            SET first_name = IF(first_name IS NULL, first_name, ?),
            last_name = IF(last_name IS NULL, last_name, ?),
            cpr = IF(cpr IS NULL, cpr, ?)
            WHERE id = ?;
            `,
            [citizen.firstName, citizen.lastName, citizen.cpr, uuid]
        );
    }

    async delete(uuid: string) {
        return await pool.query('DELETE FROM Citizen WHERE id = ?;', [uuid]);
    }
}
