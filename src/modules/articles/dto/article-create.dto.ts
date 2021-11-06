import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsUrl()
  banner: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @MinLength(1, { each: true })
  categories: number[];

  @MinLength(0, { each: true })
  tags: number[];
}
