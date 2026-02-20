import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../prisma/prisma.service';

const prismaMock = {
  pageView: {
    create: jest.fn(),
  },
};

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    jest.clearAllMocks();
  });

  describe('recordPageView', () => {
    it('deve salvar page view com todos os dados no banco', async () => {
      const dto = { page: '/about', referrer: 'https://google.com' };
      const ip = '127.0.0.1';
      const userAgent = 'Mozilla/5.0';
      const mockRecord = {
        id: 'cuid-123',
        page: dto.page,
        referrer: dto.referrer,
        ipAddress: ip,
        userAgent,
        createdAt: new Date(),
      };

      prismaMock.pageView.create.mockResolvedValue(mockRecord);

      const result = await service.recordPageView(dto, ip, userAgent);

      expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.pageView.create).toHaveBeenCalledWith({
        data: {
          page: '/about',
          referrer: 'https://google.com',
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
        },
      });
      expect(result).toEqual(mockRecord);
    });

    it('deve salvar page view sem referrer (visita direta)', async () => {
      const dto = { page: '/home', referrer: undefined };
      prismaMock.pageView.create.mockResolvedValue({ id: 'cuid-456', page: '/home' });

      await service.recordPageView(dto, '10.0.0.1', 'Chrome/91.0');

      expect(prismaMock.pageView.create).toHaveBeenCalledWith({
        data: {
          page: '/home',
          referrer: undefined,
          ipAddress: '10.0.0.1',
          userAgent: 'Chrome/91.0',
        },
      });
    });

    it('deve retornar o registro criado pelo Prisma', async () => {
      const expected = {
        id: 'cuid-789',
        page: '/contact',
        ipAddress: '1.2.3.4',
      };
      prismaMock.pageView.create.mockResolvedValue(expected);

      const result = await service.recordPageView(
        { page: '/contact' },
        '1.2.3.4',
        'Safari',
      );

      expect(result).toBe(expected);
    });
  });
});
