import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/drizzle/schema.ts', './src/drizzle/schema/*'],
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'ijl',
    port: Number(process.env.DB_PORT) || 3306,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
  introspect: {
    casing: 'preserve',
  },
  migrations: {
    prefix: 'timestamp',
  },
});
