import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateArticleCommentDto {
  @IsString()
  @IsNotEmpty()
  content?: string;
}
