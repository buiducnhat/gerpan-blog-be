import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateArticleCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  content?: string;
}
