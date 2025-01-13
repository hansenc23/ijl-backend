import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';
import * as schema from './schema';
const mockCompany = { id: 1, name: 'Air Mas Logistik', initials: 'AML' };

const mockDatabaseService = {
  primary: {
    query: {
      company: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
    insert: jest.fn(() => ({
      values: jest.fn().mockReturnThis(),
    })),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, { provide: DatabaseService, useValue: mockDatabaseService }],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    jest.spyOn(mockDatabaseService.primary, 'insert');
    jest.spyOn(mockDatabaseService.primary.insert(), 'values');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('/companies - getCompanies', () => {
    it('should return a list of companies', async () => {
      mockDatabaseService.primary.query.company.findMany.mockResolvedValue([mockCompany]);

      const result = await service.getCompanies();

      expect(result).toEqual([mockCompany]);
      expect(mockDatabaseService.primary.query.company.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('/companies/:id - getCompany', () => {
    it('should return a company by ID', async () => {
      mockDatabaseService.primary.query.company.findFirst.mockResolvedValue(mockCompany);

      const result = await service.getCompany(1);
      expect(result).toEqual(mockCompany);
      expect(mockDatabaseService.primary.query.company.findFirst).toHaveBeenCalledWith({
        where: expect.anything(),
      });
    });

    it('should throw NotFoundException if no company is found', async () => {
      mockDatabaseService.primary.query.company.findFirst.mockResolvedValue(null);

      await expect(service.getCompany(1)).rejects.toThrow(NotFoundException);
      expect(mockDatabaseService.primary.query.company.findFirst).toHaveBeenCalledWith({
        where: expect.anything(),
      });
    });
  });

  describe('/companies - createCompany', () => {
    it('should create a company', async () => {
      await service.createCompany(mockCompany);
      expect(mockDatabaseService.primary.insert).toHaveBeenCalledWith(schema.company);
    });
  });
});
