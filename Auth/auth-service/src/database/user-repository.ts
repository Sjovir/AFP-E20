import { Service } from 'typedi';
import dbPool from './mariadb-client';

@Service()
class UserRepository {
    async create(user: IRegister) {
        await dbPool.query('INSERT INTO User VALUES (uuid(), ?, ?, ?, ?, ?);', [
            user.firstName,
            user.lastName,
            user.cpr,
            user.username,
            user.password,
        ]);
    }

    async find(username?: string, cpr?: string) {
        const userQuery = await dbPool.query(
            'SELECT * FROM User where cpr = ? OR username = ?;',
            [cpr || '', username || '']
        );

        return userQuery.length > 0 ? userQuery[0] : null;
    }

    async get(userUUID: string) {
        const userQuery = await dbPool.query(
            'SELECT * FROM User where id = ?',
            [userUUID]
        );

        return userQuery.length > 0 ? userQuery[0] : null;
    }
}

export default UserRepository;
