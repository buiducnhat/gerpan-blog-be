import { Min, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsInt()
  itemCount: number;

  @IsInt()
  totalItems: number;

  @IsInt()
  itemsPerPage: number;

  @IsInt()
  totalPages: number;

  @IsInt()
  currentPage: number;
}

export class PaginationDto<TEntity> {
  items: TEntity[];
  meta: PaginationMetaDto;
}
