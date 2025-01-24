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
    });

    if (!voyage) {
      throw new NotFoundException();
    }

    return voyage;
  }

  async createVoyage(voyage: typeof voyageSchema.$inferInsert) {
    await this.db.primary.insert(voyageSchema).values(voyage);
  }
}
