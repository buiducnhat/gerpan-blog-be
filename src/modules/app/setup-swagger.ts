import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PaginationMetaDto } from '@modules/pagination/dto/pagination.dto';

export const setupSwagger = (app: INestApplication, prefix: string): void => {
  const config = new DocumentBuilder()
    .setTitle('Gerpan Blog Api')
    .setDescription('Gerpan Blog Api documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, { extraModels: [PaginationMetaDto] });
  SwaggerModule.setup(prefix + '/docs', app, document);
};
