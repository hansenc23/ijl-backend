import { text, mysqlTable, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { deal } from '../deal/schema';

export const company = mysqlTable('Company', {
  id: int('id').autoincrement().primaryKey(),
  name: text('name').notNull(),
  initials: text('initials').notNull(),
});

export const companyRelations = relations(company, ({ many }) => ({
  deals: many(deal),
}));
