import pool from './connector';

export default class InstallationModel {
    async get(uuid: string) {
        return await pool.query(
            'SELECT id, name, address FROM Installation WHERE id = ?;',
            [uuid]
        );
    }

    async getAll() {
        return await pool.query('SELECT id, name, address FROM Installation;');
    }

    async create(installation: IInstallation) {
        return await pool.query(
            `
            INSERT INTO Installation (id, name, address)
            VALUES (uuid(), ?, ?);
            `,
            [installation.name, installation.address]
        );
    }

    async update(uuid: string, installation: Partial<IInstallation>) {
        return await pool.query(
            `
            UPDATE Installation
            SET name = IF(name IS NULL, name, ?),
            address = IF(address IS NULL, address, ?)
            WHERE id = ?;
            `,
            [installation.name, installation.address, uuid]
        );
    }

    async delete(uuid: string) {
        return await pool.query('DELETE FROM Installation WHERE id = ?;', [
            uuid,
        ]);
    }

    async addCitizen(citizenUUID: string, installationUUID: string) {
        return await pool.query(
            `
        INSERT INTO CitizenInstallation (id, citizen_id, installation_id)
        VALUES (uuid(), ?, ?);
        `,
            [citizenUUID, installationUUID]
        );
    }

    async removeCitizen(citizenUUID: string, installationUUID: string) {
        return await pool.query(
            `
            DELETE FROM CitizenInstallation WHERE citizen_id = ? AND installation_id = ?;
        `,
            [citizenUUID, installationUUID]
        );
    }

    async removeCitizenById(CitizenInstallationUUID: string) {
        return await pool.query(
            `
            DELETE FROM CitizenInstallation WHERE id = ?;
        `,
            [CitizenInstallationUUID]
        );
    }
}
