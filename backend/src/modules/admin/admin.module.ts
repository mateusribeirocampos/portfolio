import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { getJwtSecret } from '../../config/jwt-secret';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: getJwtSecret(),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AdminModule {}
