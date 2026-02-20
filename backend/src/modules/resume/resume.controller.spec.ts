import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

const resumeServiceMock = {
  downloadResume: jest.fn(),
  getDownloadStats: jest.fn(),
};

// Mock da Response do Express
const createMockResponse = () => ({
  setHeader: jest.fn(),
  sendFile: jest.fn(),
});

describe('ResumeController', () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [
        { provide: ResumeService, useValue: resumeServiceMock },
      ],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
    jest.clearAllMocks();
  });

  describe('GET /api/resume/download/:language', () => {
    it('deve definir headers corretos e enviar o arquivo', async () => {
      const mockFileData = {
        filePath: '/app/assets/resumes/resume-en-port.pdf',
        fileName: 'resume-en-port.pdf',
        mimeType: 'application/pdf',
      };
      resumeServiceMock.downloadResume.mockResolvedValue(mockFileData);
      const res = createMockResponse();

      await controller.downloadResume('en', res as any, '127.0.0.1', 'Mozilla/5.0');

      expect(resumeServiceMock.downloadResume).toHaveBeenCalledWith(
        'en',
        '127.0.0.1',
        'Mozilla/5.0',
      );
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Disposition',
        'attachment; filename="resume-en-port.pdf"',
      );
      expect(res.sendFile).toHaveBeenCalledWith(mockFileData.filePath);
    });

    it('deve usar o arquivo PT-BR para idioma pt-BR', async () => {
      const mockFileData = {
        filePath: '/app/assets/resumes/resume-pt-br-port.pdf',
        fileName: 'resume-pt-br-port.pdf',
        mimeType: 'application/pdf',
      };
      resumeServiceMock.downloadResume.mockResolvedValue(mockFileData);
      const res = createMockResponse();

      await controller.downloadResume('pt-BR', res as any, '10.0.0.1', 'Chrome');

      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Disposition',
        'attachment; filename="resume-pt-br-port.pdf"',
      );
    });

    it('deve lançar HttpException 500 quando o service falhar', async () => {
      resumeServiceMock.downloadResume.mockRejectedValue(new Error('Arquivo não encontrado'));
      const res = createMockResponse();

      await expect(
        controller.downloadResume('en', res as any, '1.1.1.1', 'agent'),
      ).rejects.toThrow(HttpException);

      await expect(
        controller.downloadResume('en', res as any, '1.1.1.1', 'agent'),
      ).rejects.toMatchObject({ status: HttpStatus.INTERNAL_SERVER_ERROR });
    });
  });

  describe('GET /api/resume/stats', () => {
    it('deve retornar as estatísticas de download', async () => {
      const mockStats = {
        total: 42,
        lastMonth: 10,
        byLanguage: [
          { language: 'en', _count: 30 },
          { language: 'pt-BR', _count: 12 },
        ],
      };
      resumeServiceMock.getDownloadStats.mockResolvedValue(mockStats);

      const result = await controller.getDownloadStats();

      expect(resumeServiceMock.getDownloadStats).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStats);
    });

    it('deve retornar zeros quando não há downloads', async () => {
      resumeServiceMock.getDownloadStats.mockResolvedValue({
        total: 0,
        lastMonth: 0,
        byLanguage: [],
      });

      const result = await controller.getDownloadStats();

      expect(result.total).toBe(0);
      expect(result.byLanguage).toHaveLength(0);
    });
  });
});
