import { Service } from 'typedi';
import client from './mariadb-client';

@Service()
class RoleRepository {
    async getAccessRightsByRole(roleUUID: string) {
        const query = await client.query(
            `SELECT AccessRight.name, AccessRight.code FROM AccessRight
            INNER JOIN Role_AccessRight ON Role_AccessRight.access_right_id = AccessRight.id
            WHERE Role_AccessRight.role_id = ?;`,
            [roleUUID]
        );

        return query.map((data: { code: string }) => data.code);
    }

    async getAccessRightsByUsername(
        installationUUID: string,
        username: string
    ): Promise<string[]> {
        const query = await client.query(
            `SELECT AccessRight.code FROM User
            INNER JOIN Installation_User ON User.id = Installation_User.user_id
            INNER JOIN Installation_User_Role ON Installation_User.id = Installation_User_Role.installation_user_id
            INNER JOIN Installation_Role ON Installation_User_Role.installation_role_id = Installation_Role.id
            INNER JOIN Role ON Installation_Role.role_id = Role.id
            INNER JOIN Role_AccessRight ON Role.id = Role_AccessRight.role_id
            INNER JOIN AccessRight ON Role_AccessRight.access_right_id = AccessRight.id
            WHERE Installation_User.installation_id = ? AND User.username = ?;`,
            [installationUUID, username]
        );

        return query.map((data: { code: string }) => data.code);
    }

    async createRole(title: string): Promise<string> {
        const result = await client.query(
            'INSERT INTO Role (title) VALUES (?) RETURNING id;',
            [title]
        );

        return result.length > 0 ? result[0].id : undefined;
    }

    async deleteRole(roleUUID: string) {
        return await client.query('DELETE FROM Role WHERE id = ?;', [roleUUID]);
    }
}

export default RoleRepository;
