CREATE DATABASE IF NOT EXISTS bosted;
use bosted;

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

CREATE TABLE CitizenInstallation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	citizen_id VARCHAR(36) NOT NULL,
	installation_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
    FOREIGN KEY (citizen_id) REFERENCES Citizen(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	CONSTRAINT row_unique UNIQUE (citizen_id, installation_id)
);

CREATE TABLE AccountInstallation (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	account_id VARCHAR(36) NOT NULL,
	installation_id VARCHAR(36) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (installation_id) REFERENCES Installation(id),
	CONSTRAINT row_unique UNIQUE (account_id, installation_id)
);
