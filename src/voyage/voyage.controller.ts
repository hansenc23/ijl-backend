import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { CreateVoyageRequest } from './dto/create-voyage.request';
@Controller('voyages')
export class VoyageController {
  constructor(private readonly voyageService: VoyageService) {}

  @Get()
  async getVoyages() {
    return this.voyageService.getVoyages();
  }

  @Get(':id')
  async getVoyage(@Param('id') voyageId: string) {
    return this.voyageService.getVoyage(parseInt(voyageId));
  }

  @Post()
  async createShip(@Body() request: CreateVoyageRequest) {
    return this.voyageService.createVoyage(request);
  }
}
