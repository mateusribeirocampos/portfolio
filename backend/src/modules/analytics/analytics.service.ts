import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageViewDto } from './dto/create-pageview.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async recordPageView(
    dto: CreatePageViewDto,
    ipAddress: string,
    userAgent: string,
  ) {
    return this.prisma.pageView.create({
      data: {
        page: dto.page,
        referrer: dto.referrer,
        ipAddress,
        userAgent,
      },
    });
  }
}
