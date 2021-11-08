import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleCommentsService } from './article-comments.service';
import { ArticleCommentsController } from './article-comments.controller';
import { ArticleComment } from './entities/article-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleComment])],
  controllers: [ArticleCommentsController],
  providers: [ArticleCommentsService],
  exports: [ArticleCommentsService],
})
export class ArticleCommentsModule {}
