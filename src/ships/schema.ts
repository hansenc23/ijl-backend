import { text, mysqlTable, serial } from 'drizzle-orm/mysql-core';

export const ships = mysqlTable('Ships', {
  id: serial('id').primaryKey(),
  name: text('name'),
  nahkoda: text('nahkoda'),
});
