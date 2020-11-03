CREATE DATABASE IF NOT EXISTS bosted;
USE bosted;

CREATE TABLE Citizen (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	cpr VARCHAR(10) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Installation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	name VARCHAR(50) UNIQUE NOT NULL,
	address VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Installation_Citizen (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	installation_id VARCHAR(36) NOT NULL,
	citizen_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
    FOREIGN KEY (citizen_id) REFERENCES Citizen(id),
	CONSTRAINT row_unique UNIQUE (installation_id, citizen_id)
);

CREATE TABLE Account_Installation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	account_id VARCHAR(36) NOT NULL,
	installation_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	CONSTRAINT row_unique UNIQUE (account_id, installation_id)
);
