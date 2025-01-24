import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DatabaseModule } from 'src/database';
import { VoyageService } from '../voyage/voyage.service';
@Module({
  imports: [DatabaseModule],
  controllers: [DealController],
  providers: [DealService, VoyageService],
})
export class DealModule {}
