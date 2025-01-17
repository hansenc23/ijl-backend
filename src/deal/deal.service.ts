import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DealService {
  constructor(private db: DatabaseService) {}

  async getDeals() {
    return this.db.primary.query.deal.findMany();
  }

  async getDeal(deal_id: number) {
    const deal = await this.db.primary.query.deal.findFirst({
      where: eq(schema.deal.id, deal_id),
      with: {
        company: true,
        voyage: true,
      },
    });
    if (!deal) {
      throw new NotFoundException();
    }

    return deal;
  }

  async createDeal(deal: typeof schema.deal.$inferInsert) {
    const { rate_per_tonne, unit_weight, quantity } = deal;
    const total_weight_in_tonnes = (quantity * unit_weight) / 1000;
    const total_price = total_weight_in_tonnes * rate_per_tonne;

    const dealRecord = {
      ...deal,
      total_price,
    };
    await this.db.primary.insert(schema.deal).values(dealRecord);
  }

  async updateDeal(deal_id: number, deal: Partial<typeof schema.deal.$inferInsert>) {
    const dealRecord = await this.db.primary.query.deal.findFirst({
      where: eq(schema.deal.id, deal_id),
    });

    if (!dealRecord) {
      throw new NotFoundException();
    }

    const { rate_per_tonne, quantity, unit_weight } = deal;

    const updatedRatePerTonne = rate_per_tonne ?? dealRecord.rate_per_tonne;
    const updatedQuantity = quantity ?? dealRecord.quantity;
    const updatedUnitWeight = unit_weight ?? dealRecord.unit_weight;

    const total_weight_in_tonnes = (updatedQuantity * updatedUnitWeight) / 1000;
    const total_price = updatedRatePerTonne * total_weight_in_tonnes;

    const dealRecordUpdate = {
      ...deal,
      total_price,
    };

    await this.db.primary.update(schema.deal).set(dealRecordUpdate).where(eq(schema.deal.id, dealRecord.id));
  }
}
