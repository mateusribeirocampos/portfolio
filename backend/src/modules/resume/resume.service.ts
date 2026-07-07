import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Os PDFs vivem apenas em frontend/public/ (fonte única); o backend os busca
// de lá para manter o tracking sem precisar de uma cópia própria em assets/.
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://portfolio-mateusribeirocampos.vercel.app';

@Injectable()
export class ResumeService {
  private readonly logger = new Logger(ResumeService.name);

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

    const fileUrl = new URL(`/${fileName}`, FRONTEND_URL).toString();
    const response = await fetch(fileUrl).catch((error: Error) => {
      this.logger.error(
        `Falha de rede ao buscar ${fileUrl}: ${error.message}` +
          (error.cause ? ` (cause: ${String(error.cause)})` : ''),
      );
      throw error;
    });

    if (!response.ok) {
      this.logger.error(`Frontend respondeu HTTP ${response.status} para ${fileUrl}`);
      throw new NotFoundException('Arquivo de currículo não encontrado');
    }

    const fileBuffer = Buffer.from(await response.arrayBuffer());

    return {
      fileBuffer,
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
