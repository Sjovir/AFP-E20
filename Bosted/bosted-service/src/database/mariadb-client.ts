import mariadb from 'mariadb';

const client = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_BOSTED,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  connectionLimit: 5,
});

export default client;
