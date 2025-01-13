import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
