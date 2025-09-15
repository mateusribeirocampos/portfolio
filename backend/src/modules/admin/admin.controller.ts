import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('contacts')
  async getContacts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.adminService.getContacts(pageNum, limitNum, status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('contacts/:id/status')
  async updateContactStatus(
    @Param('id') contactId: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateContactStatus(contactId, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics')
  async getAnalytics() {
    return this.adminService.getAnalytics();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }
}
