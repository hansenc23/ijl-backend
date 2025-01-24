import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ship as shipSchema } from '../drizzle/schema/ship';
import { eq } from 'drizzle-orm';

@Injectable()
export class ShipService {
  constructor(private db: DatabaseService) {}

  async getShips() {
    return this.db.primary.query.ship.findMany();
  }

  async getShip(id: number) {
    const ship = await this.db.primary.query.ship.findFirst({
      where: eq(shipSchema.id, id),
      with: {
        voyages: true,
      },
    });

    if (!ship) {
      throw new NotFoundException();
    }

    return ship;
  }

  async createShip(ship: typeof shipSchema.$inferInsert) {
    await this.db.primary.insert(shipSchema).values(ship);
  }

  async updateShip(id: number, ship: Partial<typeof shipSchema.$inferInsert>) {
    await this.db.primary.update(shipSchema).set(ship).where(eq(shipSchema.id, id));
  }

  async deleteShip(id: number) {
    const ship = await this.db.primary.query.ship.findFirst({
      where: eq(shipSchema.id, id),
    });

    if (!ship) {
      throw new NotFoundException();
    }

    await this.db.primary.delete(shipSchema).where(eq(shipSchema.id, id));
  }

  async getShipWithVoyages(shipId: number) {
    const shipWithVoyages = await this.db.primary.query.ship.findFirst({
      where: eq(shipSchema.id, shipId),
      with: {
        voyages: true,
      },
    });

    if (!shipWithVoyages) {
      throw new NotFoundException();
    }

    return shipWithVoyages;
  }
}
