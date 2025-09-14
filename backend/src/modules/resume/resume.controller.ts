import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ResumeService } from './resume.service';
import { GetIp, GetUserAgent } from '../../common/decorators/get-ip.decorator';

@Controller('api/resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('download/:language')
  async downloadResume(
    @Param('language') language: string,
    @Res() res: Response,
    @GetIp() ip: string,
    @GetUserAgent() userAgent: string,
  ) {
    try {
      const { filePath, fileName, mimeType } = await this.resumeService.downloadResume(
        language,
        ip,
        userAgent,
      );

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.sendFile(filePath);
    } catch (error) {
      throw new HttpException(
        'Erro ao baixar currículo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getDownloadStats() {
    return this.resumeService.getDownloadStats();
  }
}