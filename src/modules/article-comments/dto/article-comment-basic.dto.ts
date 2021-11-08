import { OmitType } from '@nestjs/swagger';

import { ArticleComment } from '../entities/article-comment.entity';
import { BasicUserDto } from '@src/modules/users/dto/user-basic.dto';
// import { BasicArticleDto } from '@src/modules/articles/dto/article-basic.dto';

export class BasicArticleCommentDto extends OmitType(ArticleComment, [
  'article',
  'user',
  'parent',
  'children',
] as const) {
  user: BasicUserDto;
  // article: BasicArticleDto;
}
