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

    async getAccessRightsByUserId(userUUID: string) {
        const query = await client.query(
            `SELECT AccessRight.code FROM User
            INNER JOIN UserRole ON User.id = UserRole.user_id
            INNER JOIN RoleAccessRight ON UserRole.role_id = RoleAccessRight.role_id
            INNER JOIN AccessRight ON RoleAccessRight.access_right_id = AccessRight.id WHERE User.id = ?;`,
            [userUUID]
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
