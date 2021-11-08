import { Min, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParamsDto {
  @ApiProperty({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  itemCount: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  totalItems: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  itemsPerPage: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  totalPages: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  currentPage: number;
}

export class PaginationDto<TEntity> {
  items: TEntity[];
  meta: PaginationMetaDto;
}
