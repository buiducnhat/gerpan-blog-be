import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateArticleDto {
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

  @IsInt()
  category: number;

  @IsArray()
  tags: number[];
}
