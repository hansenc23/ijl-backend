import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ShipsService {
  constructor(private db: DatabaseService) {}

  async getShips() {
    return this.db.primary.query.ships.findMany();
  }

  async getShip(id: number) {
    const ship = await this.db.primary.query.ships.findFirst({
      where: eq(schema.ships.id, id),
    });

    if (!ship) {
      throw new NotFoundException();
    }

    return ship;
  }

  async createShip(ship: typeof schema.ships.$inferInsert) {
    await this.db.primary.insert(schema.ships).values(ship);
  }

  async updateShip(id: number, ship: Partial<typeof schema.ships.$inferInsert>) {
    await this.db.primary.update(schema.ships).set(ship).where(eq(schema.ships.id, id));
  }

  async deleteShip(id: number) {
    const ship = await this.db.primary.query.ships.findFirst({
      where: eq(schema.ships.id, id),
    });

    if (!ship) {
      throw new NotFoundException();
    }

    await this.db.primary.delete(schema.ships).where(eq(schema.ships.id, id));
  }
}
