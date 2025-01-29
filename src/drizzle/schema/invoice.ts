import { relations } from 'drizzle-orm';
import { mysqlTable, int, foreignKey, mysqlEnum, float, boolean, datetime, varchar } from 'drizzle-orm/mysql-core';
import { deal } from './deal';

export const invoice = mysqlTable(
  'Invoice',
  {
    id: int('id').autoincrement().primaryKey(),
    deal_id: int('deal_id').notNull(),
    type: mysqlEnum('type', ['DOWN_PAYMENT', 'FINAL_PAYMENT']).notNull(),
    invoice_number: varchar('invoice_number', { length: 50 }).notNull().unique('invoice_numvber'),
    amount: float('amount').notNull(),
    is_paid: boolean('is_paid').notNull().default(false),
    created_at: datetime('created_at', { mode: 'date' }).notNull(),
  },
  (table) => {
    return {
      deal_id_reference: foreignKey({
        columns: [table.deal_id],
        foreignColumns: [deal.id],
        name: 'Invoice_ibfk_1',
      })
        .onDelete('restrict')
        .onUpdate('cascade'),
    };
  },
);

export const invoiceRelations = relations(invoice, ({ one }) => ({
  deal: one(deal, {
    fields: [invoice.deal_id],
    references: [deal.id],
  }),
}));
