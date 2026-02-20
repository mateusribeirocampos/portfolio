import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreatePageViewDto } from './dto/create-pageview.dto';
import { GetIp, GetUserAgent } from '../../common/decorators/get-ip.decorator';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('pageview')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recordPageView(
    @Body() dto: CreatePageViewDto,
    @GetIp() ip: string,
    @GetUserAgent() userAgent: string,
  ) {
    await this.analyticsService.recordPageView(dto, ip, userAgent);
  }
}
