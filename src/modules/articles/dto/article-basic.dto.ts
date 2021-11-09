import { PickType } from '@nestjs/swagger';
import { BasicArticleCategoryDto } from '@src/modules/article-categories/dto/article-category-basic.dto';
import { BasicArticleCommentDto } from '@src/modules/article-comments/dto/article-comment-basic.dto';
import { BasicArticleTagDto } from '@src/modules/article-tags/dto/article-tag-basic.dto';
import { BasicUserDto } from '@src/modules/users/dto/user-basic.dto';

import { Article } from '../entities/article.entity';

export class BasicArticleDto extends PickType(Article, [
  'id',
  'title',
  'banner',
  'content',
  'description',
  'published',
  'createdAt',
  'updatedAt',
]) {
  author: BasicUserDto;
  category: BasicArticleCategoryDto;
  tags: BasicArticleTagDto[];
  comments: BasicArticleCommentDto[];
}
