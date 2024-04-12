import { createPool } from 'mysql2/promise';
import { host as _host, user as _user, password as _password, database as _database } from './db_config.js';

// Create connection pool
const pool = createPool({
  host: _host,
  user: _user,
  password: _password,
  database: _database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
