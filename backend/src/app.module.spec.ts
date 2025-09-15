import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  describe('Module Configuration', () => {
    it('should compile the module successfully', () => {
      expect(module).toBeDefined();
    });

    it('should have ConfigModule imported and ConfigService available', () => {
      const configService = module.get<ConfigService>(ConfigService);
      expect(configService).toBeDefined();
      expect(configService).toBeInstanceOf(ConfigService);
    });

    it('should have AppController available', () => {
      const appController = module.get<AppController>(AppController);
      expect(appController).toBeDefined();
      expect(appController).toBeInstanceOf(AppController);
    });

    it('should have AppService available', () => {
      const appService = module.get<AppService>(AppService);
      expect(appService).toBeDefined();
      expect(appService).toBeInstanceOf(AppService);
    });
  });

  describe('Environment Configuration', () => {
    it('should load environment variables via ConfigService', () => {
      const configService = module.get<ConfigService>(ConfigService);

      // Test that ConfigService can get a value (env vars come as strings)
      const port = configService.get<string>('PORT', '3000');
      expect(typeof port).toBe('string');
      expect(parseInt(String(port), 10)).toBeGreaterThan(0);
    });

    it('should provide default values when env var is not set', () => {
      const configService = module.get<ConfigService>(ConfigService);

      // Test with a non-existent env var
      const nonExistentVar = configService.get<string>(
        'NON_EXISTENT_VAR',
        'default-value',
      );
      expect(nonExistentVar).toBe('default-value');
    });
  });
});
