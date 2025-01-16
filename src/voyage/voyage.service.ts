import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class VoyageService {
  constructor(private db: DatabaseService) {}

  async getVoyages() {
    return this.db.primary.query.voyage.findMany();
  }

  async getVoyage(id: number) {
    const voyage = await this.db.primary.query.voyage.findFirst({
      where: eq(schema.voyage.id, id),
    });

    if (!voyage) {
      throw new NotFoundException();
    }

    return voyage;
  }

  async createVoyage(voyage: typeof schema.voyage.$inferInsert) {
    await this.db.primary.insert(schema.voyage).values(voyage);
  }
}
