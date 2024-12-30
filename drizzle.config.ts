import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/**/schema.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
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
