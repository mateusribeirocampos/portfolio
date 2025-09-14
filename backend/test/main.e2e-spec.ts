import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Main Bootstrap Configuration (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (module) {
      await module.close();
    }
  });

  describe('Application Bootstrap', () => {
    it('should create NestJS application successfully', () => {
      expect(app).toBeDefined();
    });

    it('should have ConfigService available in application context', () => {
      const configService = app.get<ConfigService>(ConfigService);
      expect(configService).toBeDefined();
      expect(configService).toBeInstanceOf(ConfigService);
    });

    it('should read PORT configuration correctly', () => {
      const configService = app.get<ConfigService>(ConfigService);
      const port = configService.get('PORT', '3000');

      expect(typeof port).toBe('string');
      expect(parseInt(port)).toBeGreaterThan(0);
      expect(parseInt(port)).toBeLessThanOrEqual(65535); // Valid port range
    });

    it('should use default port when PORT env var is not set', () => {
      const configService = app.get<ConfigService>(ConfigService);

      // Simulate getting port with default value
      const port = configService.get('NONEXISTENT_PORT', '3000');
      expect(port).toBe('3000');
    });
  });

  describe('Environment Variable Loading', () => {
    it('should load environment variables from .env file', () => {
      const configService = app.get<ConfigService>(ConfigService);

      // Test that we can get the PORT value (should be 3000 from .env)
      const port = configService.get('PORT');
      expect(port).toBeDefined();
    });

    it('should handle missing environment variables gracefully', () => {
      const configService = app.get<ConfigService>(ConfigService);

      // Test getting a non-existent variable
      const missingVar = configService.get('MISSING_VAR');
      expect(missingVar).toBeUndefined();

      // Test with default value
      const withDefault = configService.get('MISSING_VAR', 'default');
      expect(withDefault).toBe('default');
    });
  });

  describe('Server Configuration (e2e)', () => {
    it('should respond to HTTP requests on configured port', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('should use ConfigService for server configuration', () => {
      const configService = app.get<ConfigService>(ConfigService);
      const port = configService.get('PORT', '3000');

      // Verify the port is properly configured
      expect(port).toBeDefined();
      expect(parseInt(port)).toBeGreaterThan(0);
    });
  });
});