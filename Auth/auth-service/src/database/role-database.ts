import dbPool from './connector';

class RoleDatabase {
    async getRoles(userId: string) {
        const query = await dbPool.query(
            'SELECT * FROM Role where user_id = ?;',
            [userId]
        );

        return query.length > 0 ? query[0] : null;
    }

    async getAccessRights(userId: string) {
        const query = await dbPool.query(
            `SELECT AccessRight.code FROM User
            INNER JOIN UserRole ON User.id = UserRole.user_id
            INNER JOIN RoleAccessRight ON UserRole.role_id = RoleAccessRight.role_id
            INNER JOIN AccessRight ON RoleAccessRight.access_right_id = AccessRight.id WHERE User.id = ?;`,
            [userId]
        );

        return query.map((data: { code: string }) => data.code);
    }
}

export default RoleDatabase;
