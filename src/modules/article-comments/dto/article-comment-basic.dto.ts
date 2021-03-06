import { OmitType } from '@nestjs/swagger';

import { ArticleComment } from '../entities/article-comment.entity';
import { BasicUserDto } from '@src/modules/users/dto/user-basic.dto';

export class BasicArticleCommentDto extends OmitType(ArticleComment, [
  'article',
  'user',
  'parent',
  'children',
] as const) {}

export class DetailArticleCommentDto extends OmitType(ArticleComment, [
  'article',
  'user',
  'parent',
  'children',
] as const) {
  user: BasicUserDto;
  parent: BasicArticleCommentDto;
  children: BasicArticleCommentDto[];
}
