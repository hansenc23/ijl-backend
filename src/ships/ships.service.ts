import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as schema from './schema';

@Injectable()
export class ShipsService {
  constructor(private db: DatabaseService) {}

  async getShips() {
    return this.db.primary.query.ships.findMany();
  }

  async createShip(ship: typeof schema.ships.$inferInsert) {
    await this.db.primary.insert(schema.ships).values(ship);
  }
}
