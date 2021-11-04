import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication, prefix: string): void => {
  const config = new DocumentBuilder()
    .setTitle('Simple Api')
    .setDescription('Base Nestjs Code with Typeorm-Mysql')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefix + '/docs', app, document);
};
