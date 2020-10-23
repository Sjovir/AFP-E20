CREATE DATABASE IF NOT EXISTS medicine;
use medicine;

CREATE TABLE Citizen (
	id VARCHAR(36) NOT NULL DEFAULT uuid(),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	cpr VARCHAR(10) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Drug (
    id VARCHAR(36) NOT NULL DEFAULT uuid(),
	name TEXT NOT NULL,
    code TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Ordination (
    id VARCHAR(36) NOT NULL DEFAULT uuid(),
    drug_id VARCHAR(36) NOT NULL,
	drug_amount DECIMAL NOT NULL,
    drug_unit TEXT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (drug_id) REFERENCES Drug(id)
);

CREATE TABLE Citizen_Ordination (
    id VARCHAR(36) NOT NULL DEFAULT uuid(),
	citizen_id VARCHAR(36) NOT NULL,
    ordination_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT row_unique UNIQUE (citizen_id, ordination_id)
);
