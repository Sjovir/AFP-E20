import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_MEDICINE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT),
  connectionLimit: 5,
});

export default pool;
