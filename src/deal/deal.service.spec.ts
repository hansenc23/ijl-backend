import { Test, TestingModule } from '@nestjs/testing';
import { DealService } from './deal.service';
import { DatabaseService } from '../database/database.service';
import { VoyageService } from '../voyage/voyage.service';
describe('DealService', () => {
  let service: DealService;
  let voyageService: VoyageService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealService, VoyageService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<DealService>(DealService);
    voyageService = module.get<VoyageService>(VoyageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
