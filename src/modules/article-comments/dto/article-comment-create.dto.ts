import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleCommentDto {
  @IsOptional()
  @IsInt()
  parent: number;

  @IsString()
  @IsNotEmpty()
  content?: string;
}
