import { Test, TestingModule } from '@nestjs/testing';
import { VoyageController } from './voyage.controller';
import { VoyageService } from './voyage.service';

describe('VoyageController', () => {
  let controller: VoyageController;

  beforeEach(async () => {
    const mockVoyageService = {
      getVoyages: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoyageController],
      providers: [{ provide: VoyageService, useValue: mockVoyageService }],
    }).compile();

    controller = module.get<VoyageController>(VoyageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
