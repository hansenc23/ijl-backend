import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipRequest } from './dto/create-ship.request';
import { UpdateShipRequest } from './dto/update-ship.request';
@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Get()
  async getShips() {
    return this.shipsService.getShips();
  }

  @Get(':id')
  async getShip(@Param('id') shipId: string) {
    return this.shipsService.getShip(parseInt(shipId));
  }

  @Post()
  async createShip(@Body() request: CreateShipRequest) {
    this.shipsService.createShip(request);
  }

  @Patch(':id')
  async updateShip(@Param('id') shipId: string, @Body() request: UpdateShipRequest) {
    if (Object.keys(request).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.shipsService.updateShip(parseInt(shipId), request);
  }

  @Delete(':id')
  async deleteShip(@Param('id') shipId: string) {
    return this.shipsService.deleteShip(parseInt(shipId));
  }

  @Get(':id/voyages')
  async getShipWithVoyages(@Param('id') shipId: string) {
    return this.shipsService.getShipWithVoyages(parseInt(shipId));
  }
}
