import { Test, TestingModule } from '@nestjs/testing';
import { VoyageService } from './voyage.service';
import { DatabaseService } from '../database/database.service';

describe('VoyageService', () => {
  let service: VoyageService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoyageService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<VoyageService>(VoyageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
