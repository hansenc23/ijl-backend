import { relations } from 'drizzle-orm';
import { text, mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { voyage } from './voyage';

export const ship = mysqlTable('Ship', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique('name'),
  initials: varchar('initials', { length: 10 }).notNull().unique('initials'),
  nahkoda: text('nahkoda').notNull(),
});

export const shipRelations = relations(ship, ({ many }) => ({
  voyages: many(voyage),
}));
