const path = require('path');
const dotenv = require('dotenv');

const pathEnv = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: pathEnv });

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, PORT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: PORT,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: PORT,
    dialect: 'postgres',
  },
};