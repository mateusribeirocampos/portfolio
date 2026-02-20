import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}

  async downloadResume(language: string, ipAddress: string, userAgent: string) {
    // Registrar download
    await this.prisma.resumeDownload.create({
      data: {
        ipAddress,
        userAgent,
        language,
      },
    });

    // Determinar arquivo baseado no idioma
    const fileName =
      language === 'pt-BR' ? 'resume-pt-br-port.pdf' : 'resume-en-port.pdf';

    const filePath = path.join(process.cwd(), 'assets', 'resumes', fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de currículo não encontrado');
    }

    return {
      filePath,
      fileName,
      mimeType: 'application/pdf',
    };
  }

  async getDownloadStats() {
    const [total, lastMonth, byLanguage] = await Promise.all([
      this.prisma.resumeDownload.count(),
      this.prisma.resumeDownload.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias
          },
        },
      }),
      this.prisma.resumeDownload.groupBy({
        by: ['language'],
        _count: true,
        orderBy: {
          _count: {
            language: 'desc',
          },
        },
      }),
    ]);

    return {
      total,
      lastMonth,
      byLanguage,
    };
  }
}
