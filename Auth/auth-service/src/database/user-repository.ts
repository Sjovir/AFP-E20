import { Service } from 'typedi';
import client from './mariadb-client';

@Service()
class UserRepository {
    async create(user: IRegister) {
        await client.query('INSERT INTO User VALUES (uuid(), ?, ?, ?, ?, ?);', [
            user.firstName,
            user.lastName,
            user.cpr,
            user.username,
            user.password,
        ]);
    }

    async find(username?: string, cpr?: string): Promise<IUser | null> {
        const userQuery = await client.query(
            `SELECT id, first_name as firstName, last_name as lastName, 
                    cpr, username, password_hash
             FROM User where cpr = ? OR username = ?;`,
            [cpr || '', username || '']
        );

        return userQuery.length > 0 ? userQuery[0] : null;
    }

    async get(userUUID: string): Promise<IUser | null> {
        const userQuery = await client.query(
            `SELECT id, first_name as firstName, last_name as lastName, 
                    cpr, username, password_hash
             FROM User where id = ?`,
            [userUUID]
        );

        return userQuery.length > 0 ? userQuery[0] : null;
    }
}

export default UserRepository;
