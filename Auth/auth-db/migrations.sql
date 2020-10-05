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

CREATE TABLE User_Installation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	user_id VARCHAR(36) NOT NULL,
	installation_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (user_id) REFERENCES User(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	CONSTRAINT row_unique UNIQUE (user_id, installation_id)
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

CREATE TABLE Role_AccessRight (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	role_id VARCHAR(36) NOT NULL,
	access_right_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (role_id) REFERENCES Role(id),
	FOREIGN KEY (access_right_id) REFERENCES AccessRight(id)
);
