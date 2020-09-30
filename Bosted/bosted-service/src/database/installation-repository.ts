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
        return await client.query(
            'SELECT id, name, address FROM Installation;'
        );
    }

    async create(installation: IInstallation) {
        return await client.query(
            `
            INSERT INTO Installation (name, address)
            VALUES (?, ?);
            `,
            [installation.name, installation.address]
        );
    }

    async update(uuid: string, installation: IInstallation) {
        return await client.query(
            `
            UPDATE Installation
            SET name = ?, address = ?
            WHERE id = ?;
            `,
            [installation.name, installation.address, uuid]
        );
    }

    async delete(uuid: string) {
        return await client.query('DELETE FROM Installation WHERE id = ?;', [
            uuid,
        ]);
    }

    async getCitizens(installationUUID: string) {
        return await client.query(
            `
            SELECT Citizen.id, first_name, last_name, cpr FROM Citizen
            INNER JOIN CitizenInstallation ON citizen_id = Citizen.id
            WHERE installation_id = ?;
            `,
            [installationUUID]
        );
    }

    async addCitizen(citizenUUID: string, installationUUID: string) {
        return await client.query(
            `
            INSERT INTO CitizenInstallation (citizen_id, installation_id)
            VALUES (?, ?);
            `,
            [citizenUUID, installationUUID]
        );
    }

    async removeCitizen(citizenUUID: string, installationUUID: string) {
        return await client.query(
            `
            DELETE FROM CitizenInstallation WHERE citizen_id = ? AND installation_id = ?;
            `,
            [citizenUUID, installationUUID]
        );
    }

    async removeCitizenById(CitizenInstallationUUID: string) {
        return await client.query(
            `
            DELETE FROM CitizenInstallation WHERE id = ?;
            `,
            [CitizenInstallationUUID]
        );
    }
}
