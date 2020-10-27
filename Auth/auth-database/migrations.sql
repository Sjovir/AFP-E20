CREATE DATABASE IF NOT EXISTS auth;
USE auth;

CREATE TABLE User (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	cpr VARCHAR(10) UNIQUE NOT NULL,
	username VARCHAR(100) UNIQUE NOT NULL,
	password_hash VARCHAR(128) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Role (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	title VARCHAR(100) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Installation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	name VARCHAR(50) UNIQUE NOT NULL,
	address VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE AccessRight (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	name VARCHAR(100) NOT NULL,
	code VARCHAR(64) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Role_AccessRight (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	role_id VARCHAR(36) NOT NULL,
	access_right_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (role_id) REFERENCES Role(id),
	FOREIGN KEY (access_right_id) REFERENCES AccessRight(id)
);

CREATE TABLE Installation_Role (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	installation_id VARCHAR(36) NOT NULL,
	role_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	FOREIGN KEY (role_id) REFERENCES Role(id),
	CONSTRAINT row_unique UNIQUE (installation_id, role_id)
);

CREATE TABLE Installation_User (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	installation_id VARCHAR(36) NOT NULL,
	user_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	FOREIGN KEY (user_id) REFERENCES User(id),
	CONSTRAINT row_unique UNIQUE (installation_id, user_id)
);

CREATE TABLE Installation_User_Role (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	installation_user_id VARCHAR(36) NOT NULL,
	installation_role_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_user_id) REFERENCES Installation_User(id),
	FOREIGN KEY (installation_role_id) REFERENCES Installation_Role(id),
	CONSTRAINT row_unique UNIQUE (installation_user_id, installation_role_id)
);
