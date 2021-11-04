import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { ArticleCategoryLevel } from '../enums/article-category-level.enum';

export class CreateArticleCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  content?: string;

  @IsEnum(ArticleCategoryLevel)
  level: ArticleCategoryLevel;

  @IsOptional()
  @IsNumber()
  parentId: number;
}
