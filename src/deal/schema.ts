import { text, mysqlTable, int, float, boolean, foreignKey } from 'drizzle-orm/mysql-core';
import { voyage } from '../voyage/schema';
import { company } from '../company/schema';
import { relations } from 'drizzle-orm';

export const deal = mysqlTable(
  'Deal',
  {
    id: int('id').autoincrement().primaryKey(),
    voyage_id: int('voyage_id').notNull(),
    company_id: int('company_id').notNull(),
    total_price: float('total_price').notNull(),
    is_paid: boolean('is_paid').notNull().default(false),
    quantity: int('quantity').notNull(),
    goods_description: text('goods_description').notNull(),
    rate_per_tonne: float('rate_per_tonne').notNull(),
    unit_weight: float('unit_weight').notNull(),
  },
  (table) => {
    return {
      voyage_id_reference: foreignKey({
        columns: [table.voyage_id],
        foreignColumns: [voyage.id],
        name: 'Deal_ibfk_1',
      })
        .onDelete('restrict')
        .onUpdate('cascade'),
      company_id_reference: foreignKey({
        columns: [table.company_id],
        foreignColumns: [company.id],
        name: 'Deal_ibfk_2',
      })
        .onDelete('restrict')
        .onUpdate('cascade'),
    };
  },
);

export const dealRelations = relations(deal, ({ one }) => ({
  voyage: one(voyage, {
    fields: [deal.voyage_id],
    references: [voyage.id],
  }),
  company: one(company, {
    fields: [deal.company_id],
    references: [company.id],
  }),
}));
