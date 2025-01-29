import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ShipModule } from './ship/ship.module';
import { CompanyModule } from './company/company.module';
import { VoyageModule } from './voyage/voyage.module';
import { DealModule } from './deal/deal.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ShipModule,
    CompanyModule,
    VoyageModule,
    DealModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
