import client from './mariadb-client';

class RoleRepository {
    async getRolesByUserId(userId: string) {
        const query = await client.query(
            'SELECT * FROM Role where user_id = ?;',
            [userId]
        );

        return query.length > 0 ? query[0] : null;
    }

    async getRolesByInstallationId(userId: string) {
        const query = await client.query(
            'SELECT * FROM Role where user_id = ?;',
            [userId]
        );

        return query.length > 0 ? query[0] : null;
    }

    async getAccessRightsByRole(userId: string) {
        const query = await client.query(
            `SELECT AccessRight.code FROM User
            INNER JOIN UserRole ON User.id = UserRole.user_id
            INNER JOIN RoleAccessRight ON UserRole.role_id = RoleAccessRight.role_id
            INNER JOIN AccessRight ON RoleAccessRight.access_right_id = AccessRight.id WHERE User.id = ?;`,
            [userId]
        );

        return query.map((data: { code: string }) => data.code);
    }

    async getAccessRightsByUserId(userId: string) {
        const query = await client.query(
            `SELECT AccessRight.code FROM User
            INNER JOIN UserRole ON User.id = UserRole.user_id
            INNER JOIN RoleAccessRight ON UserRole.role_id = RoleAccessRight.role_id
            INNER JOIN AccessRight ON RoleAccessRight.access_right_id = AccessRight.id WHERE User.id = ?;`,
            [userId]
        );

        return query.map((data: { code: string }) => data.code);
    }

    async createRole(title: string) {
        return await client.query(
            'INSERT INTO (title) VALUES (?) RETURNING id;',
            [title]
        );
    }
}

export default RoleRepository;
