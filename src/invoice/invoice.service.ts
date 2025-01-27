import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database';
import { invoice as invoiceSchema } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { DateTime } from 'luxon';
@Injectable()
export class InvoiceService {
  constructor(private db: DatabaseService) {}

  async getInvoices() {
    return this.db.primary.query.invoice.findMany();
  }

  async getInvoice(invoice_id: number) {
    const invoice = await this.db.primary.query.invoice.findFirst({
      where: eq(invoiceSchema.id, invoice_id),
      with: {
        deal: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException();
    }

    return invoice;
  }

  async createInvoice(invoice: typeof invoiceSchema.$inferInsert) {
    await this.db.primary.insert(invoiceSchema).values({
      ...invoice,
      created_at: DateTime.fromISO(invoice.created_at).toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  }

  async updateInvoice(invoice_id: number, invoice: Partial<typeof invoiceSchema.$inferInsert>) {
    const invoiceRecord = await this.db.primary.query.invoice.findFirst({
      where: eq(invoiceSchema.id, invoice_id),
    });

    if (!invoiceRecord) {
      throw new NotFoundException();
    }

    await this.db.primary.update(invoiceSchema).set(invoice).where(eq(invoiceSchema.id, invoiceRecord.id));
  }
}
