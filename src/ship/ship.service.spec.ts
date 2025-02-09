import { Test, TestingModule } from '@nestjs/testing';
import { ShipService } from './ship.service';
import { DatabaseService } from '../database/database.service';

describe('ShipsService', () => {
  let service: ShipService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<ShipService>(ShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
