import { relations } from 'drizzle-orm';
import { text, mysqlTable, int } from 'drizzle-orm/mysql-core';
import { voyage } from '../voyage/schema';

export const ships = mysqlTable('Ships', {
  id: int('id').autoincrement().primaryKey(),
  name: text('name').notNull(),
  initials: text('initials').notNull(),
  nahkoda: text('nahkoda').notNull(),
});

export const shipsRelations = relations(ships, ({ many }) => ({
  voyages: many(voyage),
}));
