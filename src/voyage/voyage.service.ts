import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { voyage as voyageSchema } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class VoyageService {
  constructor(private db: DatabaseService) {}

  async getVoyages() {
    return this.db.primary.query.voyage.findMany();
  }

  async getVoyage(id: number) {
    const voyage = await this.db.primary.query.voyage.findFirst({
      where: eq(voyageSchema.id, id),
      with: {
        ship: true,
        deals: true,
      },
    });

    if (!voyage) {
      throw new NotFoundException();
    }

    return voyage;
  }

  async getVoyageByVoyageNumber(voyage_number: string) {
    const voyage = await this.db.primary.query.voyage.findFirst({
      where: eq(voyageSchema.voyage_number, voyage_number),
      with: {
        ship: true,
        deals: true,
      },
    });

    if (!voyage) {
      return null;
    }

    return voyage;
  }

  async createVoyage(voyage: typeof voyageSchema.$inferInsert) {
    await this.db.primary.insert(voyageSchema).values(voyage);
  }
}
