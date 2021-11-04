import { Module } from '@nestjs/common';
import { ArticlleCommentsService } from './articlle-comments.service';
import { ArticlleCommentsController } from './articlle-comments.controller';

@Module({
  controllers: [ArticlleCommentsController],
  providers: [ArticlleCommentsService]
})
export class ArticlleCommentsModule {}
