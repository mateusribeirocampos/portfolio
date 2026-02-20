import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { PrismaService } from '../prisma/prisma.service';

// Mantém todas as funções reais do fs, mas substitui existsSync por um mock controlável
jest.mock('fs', () => ({
  ...jest.requireActual<typeof import('fs')>('fs'),
  existsSync: jest.fn(),
}));
import * as fs from 'fs';

const prismaMock = {
  resumeDownload: {
    create: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
};

describe('ResumeService', () => {
  let service: ResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ResumeService>(ResumeService);
    jest.clearAllMocks();
  });

  describe('downloadResume', () => {
    it('deve registrar download e retornar arquivo PT-BR', async () => {
      prismaMock.resumeDownload.create.mockResolvedValue({});
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const result = await service.downloadResume('pt-BR', '127.0.0.1', 'Mozilla/5.0');

      expect(prismaMock.resumeDownload.create).toHaveBeenCalledWith({
        data: { ipAddress: '127.0.0.1', userAgent: 'Mozilla/5.0', language: 'pt-BR' },
      });
      expect(result.fileName).toBe('resume-pt-br-port.pdf');
      expect(result.mimeType).toBe('application/pdf');
      expect(result.filePath).toContain('resume-pt-br-port.pdf');
    });

    it('deve registrar download e retornar arquivo EN para idioma "en"', async () => {
      prismaMock.resumeDownload.create.mockResolvedValue({});
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const result = await service.downloadResume('en', '10.0.0.1', 'Chrome/91.0');

      expect(prismaMock.resumeDownload.create).toHaveBeenCalledWith({
        data: { ipAddress: '10.0.0.1', userAgent: 'Chrome/91.0', language: 'en' },
      });
      expect(result.fileName).toBe('resume-en-port.pdf');
    });

    it('deve retornar arquivo EN para qualquer idioma diferente de pt-BR', async () => {
      prismaMock.resumeDownload.create.mockResolvedValue({});
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const result = await service.downloadResume('fr', '1.2.3.4', 'Firefox/89.0');

      expect(result.fileName).toBe('resume-en-port.pdf');
    });

    it('deve lançar NotFoundException quando o arquivo não existe no disco', async () => {
      prismaMock.resumeDownload.create.mockResolvedValue({});
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      await expect(
        service.downloadResume('en', '127.0.0.1', 'Mozilla/5.0'),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve registrar o download no banco mesmo quando o arquivo não existe', async () => {
      prismaMock.resumeDownload.create.mockResolvedValue({});
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      await service.downloadResume('en', '5.5.5.5', 'Bot/1.0').catch(() => {});

      expect(prismaMock.resumeDownload.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDownloadStats', () => {
    it('deve retornar total, lastMonth e byLanguage', async () => {
      prismaMock.resumeDownload.count
        .mockResolvedValueOnce(42)  // total
        .mockResolvedValueOnce(10); // lastMonth
      prismaMock.resumeDownload.groupBy.mockResolvedValue([
        { language: 'en', _count: 30 },
        { language: 'pt-BR', _count: 12 },
      ]);

      const result = await service.getDownloadStats();

      expect(result.total).toBe(42);
      expect(result.lastMonth).toBe(10);
      expect(result.byLanguage).toHaveLength(2);
    });

    it('deve retornar zeros quando não há downloads', async () => {
      prismaMock.resumeDownload.count
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0);
      prismaMock.resumeDownload.groupBy.mockResolvedValue([]);

      const result = await service.getDownloadStats();

      expect(result.total).toBe(0);
      expect(result.lastMonth).toBe(0);
      expect(result.byLanguage).toHaveLength(0);
    });

    it('deve consultar o banco com intervalo de 30 dias para lastMonth', async () => {
      prismaMock.resumeDownload.count.mockResolvedValue(0);
      prismaMock.resumeDownload.groupBy.mockResolvedValue([]);

      const before = Date.now();
      await service.getDownloadStats();
      const after = Date.now();

      const countCalls = prismaMock.resumeDownload.count.mock.calls;
      // Segunda chamada é o lastMonth (com filtro where)
      const whereClause = countCalls[1][0]?.where?.createdAt?.gte as Date;
      expect(whereClause).toBeInstanceOf(Date);

      const diffMs = before - whereClause.getTime();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      // Tolerância de 1 segundo para execução do teste
      expect(diffMs).toBeGreaterThanOrEqual(thirtyDaysMs - 1000);
      expect(diffMs).toBeLessThanOrEqual(thirtyDaysMs + (after - before) + 1000);
    });
  });
});
