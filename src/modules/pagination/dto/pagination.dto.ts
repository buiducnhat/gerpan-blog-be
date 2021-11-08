import { Min, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class PaginationMetaDto {
  @ApiProperty()
  @IsInt()
  itemCount: number;

  @ApiProperty()
  @IsInt()
  totalItems: number;

  @ApiProperty()
  @IsInt()
  itemsPerPage: number;

  @ApiProperty()
  @IsInt()
  totalPages: number;

  @ApiProperty()
  @IsInt()
  currentPage: number;
}

export class PaginationDto<TEntity> {
  items: TEntity[];
  meta: PaginationMetaDto;
}
