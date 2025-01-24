import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShipRequest } from './dto/create-ship.request';
import { UpdateShipRequest } from './dto/update-ship.request';
@Controller('ships')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get()
  async getShips() {
    return this.shipService.getShips();
  }

  @Get(':id')
  async getShip(@Param('id') shipId: string) {
    return this.shipService.getShip(parseInt(shipId));
  }

  @Post()
  async createShip(@Body() request: CreateShipRequest) {
    this.shipService.createShip(request);
  }

  @Patch(':id')
  async updateShip(@Param('id') shipId: string, @Body() request: UpdateShipRequest) {
    if (Object.keys(request).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.shipService.updateShip(parseInt(shipId), request);
  }

  @Delete(':id')
  async deleteShip(@Param('id') shipId: string) {
    return this.shipService.deleteShip(parseInt(shipId));
  }

  @Get(':id/voyages')
  async getShipWithVoyages(@Param('id') shipId: string) {
    return this.shipService.getShipWithVoyages(parseInt(shipId));
  }
}
