import { Test, TestingModule } from '@nestjs/testing';
import { DealService } from './deal.service';
import { DatabaseService } from '../database/database.service';

describe('DealService', () => {
  let service: DealService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<DealService>(DealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
