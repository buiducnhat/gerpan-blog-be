import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { ArticleTag } from '@modules/article-tags/entities/article-tag.entity';
import { ArticleCategory } from '@modules/article-categories/entities/article-category.entity';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { ArticleComment } from '@modules/article-comments/entities/article-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleCategory, ArticleTag, ArticleComment]),
    PaginationModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
