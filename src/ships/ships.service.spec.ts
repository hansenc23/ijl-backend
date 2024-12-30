import { Test, TestingModule } from '@nestjs/testing';
import { ShipsService } from './ships.service';
import { DatabaseService } from '../database/database.service';

describe('ShipsService', () => {
  let service: ShipsService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipsService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<ShipsService>(ShipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
