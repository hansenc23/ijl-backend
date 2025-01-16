import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ShipsModule } from './ships/ships.module';
import { CompanyModule } from './company/company.module';
import { VoyageModule } from './voyage/voyage.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), ShipsModule, CompanyModule, VoyageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
