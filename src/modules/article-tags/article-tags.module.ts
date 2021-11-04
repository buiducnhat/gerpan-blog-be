import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleTagsService } from './article-tags.service';
import { ArticleTagsController } from './article-tags.controller';
import { ArticleTag } from './entities/article-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTag])],
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService],
  exports: [ArticleTagsService],
})
export class ArticleTagsModule {}
