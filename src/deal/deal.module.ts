import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [DatabaseModule],
  controllers: [DealController],
  providers: [DealService],
})
export class DealModule {}
