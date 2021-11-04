import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { IAppConfig } from './configs/app.config';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService: ConfigService<IAppConfig> = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(configService.get('apiPrefix'));

  setupSwagger(app, configService.get('apiPrefix'));

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}...`, 'StartApp');
  });
}
bootstrap();
