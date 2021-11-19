import { NestFactory, NestApplication } from '@nestjs/core';
import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';

import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './modules/app/setup-swagger';
import { IAppConfig } from './configs/app.config';
import { ValidationPipe } from './pipes/validation.pipe';
import { CustomLogger } from './modules/app/setup-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: CustomLogger,
  });
  const logger = app.get(Logger);
  const configService: ConfigService<IAppConfig> = app.get(ConfigService);

  app.enableCors({ origin: /\.vercel\.app$/ });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(configService.get('apiPrefix'), {
    exclude: [
      { path: '/', method: RequestMethod.ALL },
      { path: '/health', method: RequestMethod.ALL },
    ],
  });

  setupSwagger(app, configService.get('apiPrefix'));

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`on port ${port}...`, NestApplication.name);
  });
}
bootstrap();
