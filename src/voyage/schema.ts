import { relations } from 'drizzle-orm';
import { text, mysqlTable, int, foreignKey } from 'drizzle-orm/mysql-core';
import { ships } from '../ships/schema';

export const voyage = mysqlTable(
  'Voyage',
  {
    id: int('id').autoincrement().primaryKey(),
    voyage_number: text('voyage_number').notNull(),
    from_location: text('from_location').notNull(),
    to_location: text('to_location').notNull(),
    ship_id: int('ship_id').notNull(),
  },
  (table) => {
    return {
      ship_id_reference: foreignKey({
        columns: [table.ship_id],
        foreignColumns: [ships.id],
        name: 'Voyage_ibfk_1',
      })
        .onDelete('restrict')
        .onUpdate('cascade'),
    };
  },
);

export const voyageRelations = relations(voyage, ({ one }) => ({
  ship: one(ships, {
    fields: [voyage.ship_id],
    references: [ships.id],
  }),
}));
