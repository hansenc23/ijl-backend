import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database';
import { invoice as invoiceSchema } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { DateTime } from 'luxon';
import { VoyageService } from '../voyage/voyage.service';
import { CompanyService } from '../company/company.service';
import { ShipService } from '../ship/ship.service';
import { MAX_DEALS_PER_VOYAGE } from '../common/constants';
import { GenerateInvoiceNumberRequest } from './dto/generate-invoice-number.request';
@Injectable()
export class InvoiceService {
  constructor(
    private db: DatabaseService,
    private voyageService: VoyageService,
    private companyService: CompanyService,
    private shipService: ShipService,
  ) {}

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
      created_at: invoice.created_at,
    });
  }

  async generateInvoiceNumber(request: GenerateInvoiceNumberRequest) {
    const { company_id, ship_id, voyage_number, voyage_id, new_voyage, date } = request;
    const companyInitials = (await this.companyService.getCompany(company_id)).initials;
    const shipInitials = (await this.shipService.getShip(ship_id)).initials;
    const month = DateTime.fromISO(date.toISOString(), { locale: 'id' }).monthShort?.toUpperCase();
    const year = DateTime.fromISO(date.toISOString(), { locale: 'id' }).year;

    if (new_voyage) {
      // Validate voyage_number
      if (!voyage_number || voyage_number.trim() === '') {
        throw new BadRequestException('Voyage number is required for creating a new voyage.');
      }

      // Check if voyage number already exists
      const existingVoyage = await this.voyageService.getVoyageByVoyageNumber(voyage_number);
      if (existingVoyage) {
        throw new BadRequestException(
          `Voyage with number ${voyage_number} already exists. Please select from the existing voyage dropdown.`,
        );
      }

      return { invoice_number: `01/${companyInitials}/${shipInitials}/${voyage_number}/${month}/${year}` };
    }

    if (!new_voyage) {
      if (!voyage_id) {
        throw new BadRequestException('Voyage ID is required when selecting an existing voyage.');
      }

      const existingVoyage = await this.voyageService.getVoyage(voyage_id);
      if (!existingVoyage) {
        throw new BadRequestException(`Voyage with ID ${voyage_id} not found.`);
      }

      if (existingVoyage.deals.length >= MAX_DEALS_PER_VOYAGE) {
        throw new BadRequestException(
          `Maximum of 2 companies already using voyage number ${existingVoyage.voyage_number}. Please create a new voyage.`,
        );
      }

      const companyIndex = String(existingVoyage.deals.length + 1).padStart(2, '0');
      return {
        invoice_number: `${companyIndex}/${companyInitials}/${shipInitials}/${existingVoyage.voyage_number}/${month}/${year}`,
      };
    }
    throw new BadRequestException('Invalid request parameters.');
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
