import mariadb from 'mariadb';

const client = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3307,
    connectionLimit: 5,
});

export default client;
