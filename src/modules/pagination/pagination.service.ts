import { Injectable } from '@nestjs/common';
import {
  PaginationParamsDto,
  PaginationDto,
  PaginationWithSearchParamsDto,
} from './dto/pagination.dto';

@Injectable()
export class PaginationService {
  paginate<TEntity>(
    params: PaginationParamsDto | PaginationWithSearchParamsDto,
    items: TEntity[],
    total: number,
  ): PaginationDto<TEntity> {
    const result: PaginationDto<TEntity> = {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: params.limit,
        totalPages: Math.ceil(total / params.limit),
        currentPage: params.page,
      },
    };

    return result;
  }
}
