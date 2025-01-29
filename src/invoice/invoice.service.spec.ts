import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { DatabaseService } from '../database/database.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const mockDatabaseService = {
      query: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
