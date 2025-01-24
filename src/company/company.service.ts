import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { company as companySchema } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompanyService {
  constructor(private db: DatabaseService) {}

  async getCompanies() {
    return this.db.primary.query.company.findMany();
  }

  async getCompany(id: number) {
    const company = await this.db.primary.query.company.findFirst({
      where: eq(companySchema.id, id),
      with: {
        deals: true,
      },
    });

    if (!company) {
      throw new NotFoundException();
    }

    return company;
  }

  async createCompany(company: typeof companySchema.$inferInsert) {
    await this.db.primary.insert(companySchema).values(company);
  }

  async updateCompany(id: number, company: Partial<typeof companySchema.$inferInsert>) {
    const companyRecord = await this.db.primary.query.company.findFirst({
      where: eq(companySchema.id, id),
    });

    if (!companyRecord) {
      throw new NotFoundException();
    }

    await this.db.primary.update(companySchema).set(company).where(eq(companySchema.id, companyRecord.id));
  }

  async deleteCompany(id: number) {
    const company = await this.db.primary.query.company.findFirst({
      where: eq(companySchema.id, id),
    });

    if (!company) {
      throw new NotFoundException();
    }

    await this.db.primary.delete(companySchema).where(eq(companySchema.id, id));
  }
}
