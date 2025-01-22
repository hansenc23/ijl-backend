import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealRequest } from './dto/create-deal.request';
import { UpdateDealRequest } from './dto/update-deal.request';
@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getDeals() {
    return this.dealService.getDeals();
  }

  @Get(':id')
  async getDeal(@Param('id') deal_id: string) {
    return this.dealService.getDeal(parseInt(deal_id));
  }

  @Post()
  async createDeal(@Body() request: CreateDealRequest) {
    const { voyage, deal } = request;
    return this.dealService.createDeal(deal, voyage);
  }

  @Patch(':id')
  async updateDeal(@Param('id') deal_id: string, @Body() request: UpdateDealRequest) {
    if (Object.keys(request).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.dealService.updateDeal(parseInt(deal_id), request);
  }
}
