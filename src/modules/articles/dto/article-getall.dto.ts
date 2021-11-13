import { ApiProperty } from '@nestjs/swagger';
import { PaginationWithSearchParamsDto } from '@src/modules/pagination/dto/pagination.dto';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class ArticleGetAllParamsDto extends PaginationWithSearchParamsDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  category?: number;

  @ApiProperty({ type: [Number], required: false })
  @IsArray({ each: true })
  @IsOptional()
  tags?: number[];
}
