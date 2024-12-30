import { Test, TestingModule } from '@nestjs/testing';
import { ShipsController } from './ships.controller';
import { ShipsService } from './ships.service';

describe('ShipsController', () => {
  let controller: ShipsController;

  beforeEach(async () => {
    const mockShipsService = {
      getShips: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [{ provide: ShipsService, useValue: mockShipsService }],
    }).compile();

    controller = module.get<ShipsController>(ShipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
