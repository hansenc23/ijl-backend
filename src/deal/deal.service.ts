import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { voyage as voyageSchema } from '../drizzle/schema';
import { deal as dealSchema } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateDealRequest } from './dto/create-deal.request';
import { Logger } from '@nestjs/common';
@Injectable()
export class DealService {
  private readonly logger = new Logger(DealService.name);

  constructor(private db: DatabaseService) {}

  async getDeals() {
    return this.db.primary.query.deal.findMany();
  }

  async getDeal(deal_id: number) {
    const deal = await this.db.primary.query.deal.findFirst({
      where: eq(dealSchema.id, deal_id),
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

  async createDeal(deal: CreateDealRequest['deal'], voyage: CreateDealRequest['voyage']) {
    const total_weight_in_tonnes = (deal.quantity * deal.unit_weight) / 1000;
    const total_price = total_weight_in_tonnes * deal.rate_per_tonne;
    if (voyage && deal) {
      this.logger.log('Creating a deal with a new voyage');
      await this.db.primary.transaction(async (tx) => {
        const [newVoyage] = await tx.insert(voyageSchema).values({
          from_location: voyage.from_location,
          to_location: voyage.to_location,
          voyage_number: voyage.voyage_number,
          ship_id: voyage.ship_id,
        });

        await tx.insert(dealSchema).values({
          company_id: deal.company_id,
          goods_description: deal.goods_description,
          quantity: deal.quantity,
          rate_per_tonne: deal.rate_per_tonne,
          voyage_id: newVoyage.insertId,
          unit_weight: deal.unit_weight,
          total_price,
        });
      });
    } else {
      this.logger.log('Creating a deal with existing voyage');
      await this.db.primary.insert(dealSchema).values({
        company_id: deal.company_id,
        goods_description: deal.goods_description,
        quantity: deal.quantity,
        rate_per_tonne: deal.rate_per_tonne,
        total_price,
        unit_weight: deal.unit_weight,
        voyage_id: deal.voyage_id,
      });
    }
  }

  async updateDeal(deal_id: number, deal: Partial<typeof dealSchema.$inferInsert>) {
    const dealRecord = await this.db.primary.query.deal.findFirst({
      where: eq(dealSchema.id, deal_id),
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

    await this.db.primary.update(dealSchema).set(dealRecordUpdate).where(eq(dealSchema.id, dealRecord.id));
  }
}
