import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from '../database';
import { VoyageService } from '../voyage/voyage.service';
import { CompanyService } from '../company/company.service';
import { ShipService } from '../ship/ship.service';
@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, VoyageService, CompanyService, ShipService],
})
export class InvoiceModule {}
