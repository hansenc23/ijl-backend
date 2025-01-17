import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompanyService {
  constructor(private db: DatabaseService) {}

  async getCompanies() {
    return this.db.primary.query.company.findMany();
  }

  async getCompany(id: number) {
    const company = await this.db.primary.query.company.findFirst({
      where: eq(schema.company.id, id),
      with: {
        deals: true,
      },
    });

    if (!company) {
      throw new NotFoundException();
    }

    return company;
  }

  async createCompany(company: typeof schema.company.$inferInsert) {
    await this.db.primary.insert(schema.company).values(company);
  }

  async updateCompany(id: number, company: Partial<typeof schema.company.$inferInsert>) {
    const companyRecord = await this.db.primary.query.company.findFirst({
      where: eq(schema.company.id, id),
    });

    if (!companyRecord) {
      throw new NotFoundException();
    }

    await this.db.primary.update(schema.company).set(company).where(eq(schema.company.id, companyRecord.id));
  }

  async deleteCompany(id: number) {
    const company = await this.db.primary.query.company.findFirst({
      where: eq(schema.company.id, id),
    });

    if (!company) {
      throw new NotFoundException();
    }

    await this.db.primary.delete(schema.company).where(eq(schema.company.id, id));
  }
}
