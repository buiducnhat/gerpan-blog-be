import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

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

  @IsNumber()
  @Min(1)
  category: number;

  @IsArray()
  tags: number[];
}
