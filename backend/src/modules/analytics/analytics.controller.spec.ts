import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

const analyticsServiceMock = {
  recordPageView: jest.fn(),
};

describe('AnalyticsController', () => {
  let controller: AnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceMock },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    jest.clearAllMocks();
  });

  describe('recordPageView', () => {
    it('deve chamar o service com dto, ip e userAgent', async () => {
      const dto = { page: '/about', referrer: 'https://google.com' };
      const ip = '127.0.0.1';
      const userAgent = 'Mozilla/5.0';

      analyticsServiceMock.recordPageView.mockResolvedValue(undefined);

      await controller.recordPageView(dto, ip, userAgent);

      expect(analyticsServiceMock.recordPageView).toHaveBeenCalledTimes(1);
      expect(analyticsServiceMock.recordPageView).toHaveBeenCalledWith(dto, ip, userAgent);
    });

    it('deve chamar o service sem referrer', async () => {
      const dto = { page: '/home' };

      analyticsServiceMock.recordPageView.mockResolvedValue(undefined);

      await controller.recordPageView(dto, '10.0.0.1', 'Safari/14.0');

      expect(analyticsServiceMock.recordPageView).toHaveBeenCalledWith(
        dto,
        '10.0.0.1',
        'Safari/14.0',
      );
    });

    it('deve retornar undefined (204 No Content)', async () => {
      analyticsServiceMock.recordPageView.mockResolvedValue(undefined);

      const result = await controller.recordPageView({ page: '/test' }, '1.1.1.1', 'agent');

      expect(result).toBeUndefined();
    });
  });
});
