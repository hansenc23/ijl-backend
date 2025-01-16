import { relations } from 'drizzle-orm';
import { text, mysqlTable, int } from 'drizzle-orm/mysql-core';
import { ships } from '../ships/schema';

export const voyage = mysqlTable('Voyage', {
  id: int('id').autoincrement().primaryKey(),
  voyage_number: text('voyage_number').notNull(),
  from_location: text('from_location').notNull(),
  to_location: text('to_location').notNull(),
  ship_id: int('ship_id').references(() => ships.id),
});

export const voyageRelations = relations(voyage, ({ one }) => ({
  ship: one(ships, {
    fields: [voyage.ship_id],
    references: [ships.id],
  }),
}));
