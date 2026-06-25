import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

const prismaMock = {
  adminUser: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
};

const jwtServiceMock = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  const originalAllowUserAdmin = process.env.ALLOW_USER_ADMIN;

  beforeEach(async () => {
    process.env.ALLOW_USER_ADMIN = 'owner@example.com';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (originalAllowUserAdmin === undefined) {
      delete process.env.ALLOW_USER_ADMIN;
    } else {
      process.env.ALLOW_USER_ADMIN = originalAllowUserAdmin;
    }
  });

  it('allows login only for an email listed in ALLOW_USER_ADMIN', async () => {
    const passwordHash = await bcrypt.hash('valid-password', 4);
    prismaMock.adminUser.findFirst.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@example.com',
      password: passwordHash,
      role: 'admin',
    });
    prismaMock.adminUser.update.mockResolvedValue({});
    jwtServiceMock.sign.mockReturnValue('signed-token');

    const result = await service.login({
      email: 'Owner@Example.com',
      password: 'valid-password',
    });

    expect(prismaMock.adminUser.findFirst).toHaveBeenCalledWith({
      where: {
        email: {
          equals: 'owner@example.com',
          mode: 'insensitive',
        },
      },
    });
    expect(result.access_token).toBe('signed-token');
    expect(result.user.email).toBe('owner@example.com');
  });

  it('rejects login for an admin user whose email is not allow-listed', async () => {
    await expect(
      service.login({
        email: 'intruder@example.com',
        password: 'valid-password',
      }),
    ).rejects.toThrow(UnauthorizedException);

    expect(prismaMock.adminUser.findFirst).not.toHaveBeenCalled();
    expect(jwtServiceMock.sign).not.toHaveBeenCalled();
  });

  it('creates only allow-listed admin users', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue(null);
    prismaMock.adminUser.create.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@example.com',
      password: 'hashed-password',
      role: 'admin',
      createdAt: new Date(),
      lastLogin: null,
    });

    const result = await service.createAdmin({
      email: 'Owner@Example.com',
      password: 'valid-password',
    });

    expect(prismaMock.adminUser.create).toHaveBeenCalledWith({
      data: {
        email: 'owner@example.com',
        password: expect.any(String),
        role: 'admin',
      },
    });
    expect(result).not.toHaveProperty('password');
  });

  it('rejects creating an admin user outside ALLOW_USER_ADMIN', async () => {
    await expect(
      service.createAdmin({
        email: 'other@example.com',
        password: 'valid-password',
      }),
    ).rejects.toThrow(UnauthorizedException);

    expect(prismaMock.adminUser.create).not.toHaveBeenCalled();
  });
});
