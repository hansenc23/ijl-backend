import { relations } from 'drizzle-orm';
import { text, mysqlTable, int } from 'drizzle-orm/mysql-core';
import { voyage } from './voyage';

export const ship = mysqlTable('Ship', {
  id: int('id').autoincrement().primaryKey(),
  name: text('name').notNull(),
  initials: text('initials').notNull(),
  nahkoda: text('nahkoda').notNull(),
});

export const shipRelations = relations(ship, ({ many }) => ({
  voyages: many(voyage),
}));
