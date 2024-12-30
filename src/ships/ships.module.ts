import { Module } from '@nestjs/common';
import { ShipsController } from './ships.controller';
import { ShipsService } from './ships.service';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [DatabaseModule],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export class ShipsModule {}
