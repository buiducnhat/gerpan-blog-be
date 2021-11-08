import { Module } from '@nestjs/common';
import { ArticleCommentsService } from './article-comments.service';
import { ArticleCommentsController } from './article-comments.controller';

@Module({
  controllers: [ArticleCommentsController],
  providers: [ArticleCommentsService],
})
export class ArticleCommentsModule {}
