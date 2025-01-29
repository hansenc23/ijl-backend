import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { deal } from './deal';

export const company = mysqlTable('Company', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique('name'),
  initials: varchar('initials', { length: 10 }).notNull().unique('initials'),
});

export const companyRelations = relations(company, ({ many }) => ({
  deals: many(deal),
}));
