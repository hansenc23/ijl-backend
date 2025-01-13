import { text, mysqlTable, serial } from 'drizzle-orm/mysql-core';

export const company = mysqlTable('Company', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  initials: text('initials').notNull(),
});
