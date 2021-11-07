import {
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';

import { ForbiddenDto } from '@modules/auth/dto/forbidden.dto';
import { UnauthorizedDto } from '@src/modules/auth/dto/unauthorized.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export const MyApiForbiddenResponse = (properties?: any) =>
  ApiForbiddenResponse({ type: ForbiddenDto, ...properties });

export const MyApiUnauthorizedResponse = (properties?: any) =>
  ApiUnauthorizedResponse({ type: UnauthorizedDto, ...properties });

export class NotFoundResponse {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Not found' })
  message: string;

  @ApiProperty({ default: 'Not found' })
  error?: string;
}
export const MyApiNotFoundResponse = (properties?: any) =>
  ApiNotFoundResponse({ type: NotFoundResponse, ...properties });

export class MyPagination implements IPaginationOptions {
  @ApiProperty({ default: 1, required: false })
  page: number;

  @ApiProperty({ default: 10, required: false })
  limit: number;
}
export const MyApiPaginatedQuery = () => ApiQuery({ type: MyPagination });
