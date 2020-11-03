import { Service } from 'typedi';
import client from '../database/mariadb-client';

@Service()
export default class InstallationRepository {
  async get(uuid: string) {
    const installationQuery = await client.query(
      'SELECT id, name, address FROM Installation WHERE id = ?;',
      [uuid]
    );

    return installationQuery.length > 0 ? installationQuery[0] : null;
  }

  async getAll() {
    return await client.query('SELECT id, name, address FROM Installation;');
  }

  async getOnUser(userUUID: string) {
    return await client.query(
      `SELECT Installation.id, name, address FROM Installation 
            INNER JOIN Installation_User ON Installation.id = Installation_User.installation_id
            WHERE user_id = ?;`,
      [userUUID]
    );
  }

  async getAllByUserId(userUUID: string) {
    return await client.query('', [userUUID]);
  }

  async create(installation: IInstallation) {
    return await client.query(
      `INSERT INTO Installation (id, name, address) VALUES (?, ?, ?);`,
      [installation.id, installation.name, installation.address]
    );
  }

  async update(installation: IInstallation) {
    return await client.query(
      `
      UPDATE Installation
      SET name = ?, address = ?
      WHERE id = ?;
      `,
      [installation.name, installation.address, installation.id]
    );
  }

  async delete(uuid: string) {
    return await client.query('DELETE FROM Installation WHERE id = ?;', [uuid]);
  }

  /////////////////////////////////////////
  // USERS
  /////////////////////////////////////////

  async getAllUsers(installationUUID: string) {
    return await client.query(
      `SELECT User.id, first_name, last_name, cpr, username FROM User
            INNER JOIN Installation_User ON User.id = Installation_User.user_id WHERE installation_id = ?;`,
      [installationUUID]
    );
  }

  async addUser(installationUUID: string, userUUID: string) {
    return await client.query(
      'INSERT INTO Installation_User (user_id, installation_id) VALUES (?, ?);',
      [userUUID, installationUUID]
    );
  }

  async removeUser(installationUUID: string, userUUID: string) {
    return await client.query(
      'DELETE FROM Installation_User WHERE user_id = ? AND installation_id = ?;',
      [userUUID, installationUUID]
    );
  }

  /////////////////////////////////////////
  // USER ROLES
  /////////////////////////////////////////

  async getAllUserRoles(installationUUID: string, userUUID: string) {
    return client.query(
      `SELECT Role.id, Role.title FROM Role
            INNER JOIN Installation_Role ON Role.id = Installation_Role.role_id
            INNER JOIN Installation_User_Role ON Installation_Role.id = Installation_User_Role.installation_role_id
            INNER JOIN Installation_User ON Installation_User_Role.installation_user_id = Installation_User.id
            WHERE Installation_User.installation_id = ? AND Installation_User.user_id = ?;`,
      [installationUUID, userUUID]
    );
  }

  async addUserRole(
    installationUUID: string,
    userUUID: string,
    roleUUID: string
  ): Promise<boolean> {
    const installationUserQuery = await client.query(
      `SELECT id FROM Installation_User WHERE installation_id = ? AND user_id = ?`,
      [installationUUID, userUUID]
    );

    const installationRoleQuery = await client.query(
      `SELECT id FROM Installation_Role WHERE installation_id = ? AND role_id = ?`,
      [installationUUID, roleUUID]
    );

    if (installationUserQuery.length > 0 && installationRoleQuery.length > 0) {
      await client.query(
        'INSERT INTO Installation_User_Role (installation_user_id, installation_role_id) VALUES (?, ?);',
        [installationUserQuery[0].id, installationRoleQuery[0].id]
      );

      return true;
    }

    return false;
  }

  async removeUserRole(
    installationUUID: string,
    userUUID: string,
    roleUUID: string
  ): Promise<boolean> {
    const installationUserQuery = await client.query(
      `SELECT id FROM Installation_User WHERE installation_id = ? AND user_id = ?`,
      [installationUUID, userUUID]
    );

    const installationRoleQuery = await client.query(
      `SELECT id FROM Installation_Role WHERE installation_id = ? AND role_id = ?`,
      [installationUUID, roleUUID]
    );

    if (installationUserQuery.length > 0 && installationRoleQuery.length > 0) {
      await client.query(
        'DELETE FROM Installation_User_Role WHERE installation_user_id = ? AND installation_role_id = ?;',
        [installationUserQuery[0].id, installationRoleQuery[0].id]
      );

      return true;
    }

    return false;
  }

  /////////////////////////////////////////
  // ROLES
  /////////////////////////////////////////

  async getAllRoles(installationUUID: string) {
    return await client.query(
      `SELECT Role.id, Role.title FROM Role
            INNER JOIN Installation_Role ON Role.id = Installation_Role.role_id
            WHERE Installation_Role.installation_id = ?;`,
      [installationUUID]
    );
  }

  async addRole(installationUUID: string, roleUUID: string) {
    return await client.query(
      'INSERT INTO Installation_Role (installation_id, role_id) VALUES (?, ?);',
      [installationUUID, roleUUID]
    );
  }

  async removeRole(installationUUID: string, roleUUID: string) {
    return await client.query(
      'DELETE FROM Installation_Role WHERE role_id = ? AND installation_id = ?;',
      [roleUUID, installationUUID]
    );
  }
}
