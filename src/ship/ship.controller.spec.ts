import { Test, TestingModule } from '@nestjs/testing';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

describe('ShipsController', () => {
  let controller: ShipController;

  beforeEach(async () => {
    const mockShipsService = {
      getShips: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipController],
      providers: [{ provide: ShipService, useValue: mockShipsService }],
    }).compile();

    controller = module.get<ShipController>(ShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
