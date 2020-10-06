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

    async getAllByUserId(userId: string) {
        return await client.query('', [userId]);
    }

    async create(installation: IInstallation) {
        return await client.query(
            `INSERT INTO Installation (name, address) VALUES (?, ?);`,
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
}
