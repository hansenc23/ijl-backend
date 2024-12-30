import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipRequest } from './dto/create-ship.request';

@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Get()
  async getShips() {
    return this.shipsService.getShips();
  }

  @Post()
  async createShip(@Body() request: CreateShipRequest) {
    return this.shipsService.createShip(request);
  }
}
