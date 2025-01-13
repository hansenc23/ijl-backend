import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequest } from './dto/create-company.request';
import { UpdateCompanyRequest } from './dto/update-company.request';
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  async getShip(@Param('id') companyId: string) {
    return this.companyService.getCompany(parseInt(companyId));
  }

  @Post()
  async createCompany(@Body() request: CreateCompanyRequest) {
    this.companyService.createCompany(request);
  }

  @Patch(':id')
  async updateCompany(@Param('id') companyId: string, @Body() request: UpdateCompanyRequest) {
    if (Object.keys(request).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.companyService.updateCompany(parseInt(companyId), request);
  }

  @Delete(':id')
  async deleteShip(@Param('id') companyId: string) {
    return this.companyService.deleteCompany(parseInt(companyId));
  }
}
