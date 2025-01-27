import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

import dbConfig from '../config/db';
export const poolConnection = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  maxIdle: dbConfig.pool?.min,
  connectionLimit: dbConfig.pool?.max,
  idleTimeout: dbConfig.pool?.idle,
  connectTimeout: dbConfig.pool?.acquire,
});

const db = drizzle(poolConnection, {
  mode: 'default',
  schema,
});

export default db;
