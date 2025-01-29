import { defineConfig } from 'drizzle-kit';
//@ts-ignore
export default defineConfig({
  schema: ['./src/drizzle/schema.ts', './src/drizzle/schema/*'],
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
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
