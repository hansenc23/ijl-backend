import { Module } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { VoyageController } from './voyage.controller';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [DatabaseModule],
  controllers: [VoyageController],
  providers: [VoyageService],
})
export class VoyageModule {}
