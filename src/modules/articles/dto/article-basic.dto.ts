import { OmitType } from '@nestjs/swagger';

import { Article } from '../entities/article.entity';

export class BasicArticleDto extends OmitType(Article, []) {}
