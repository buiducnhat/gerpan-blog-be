import {
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiQuery,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

import { ForbiddenDto } from '@modules/auth/dto/forbidden.dto';
import { UnauthorizedDto } from '@src/modules/auth/dto/unauthorized.dto';
import { PaginationDto } from '@src/modules/pagination/dto/pagination.dto';

export const MyApiForbiddenResponse = (properties?: any) =>
  applyDecorators(ApiForbiddenResponse({ type: ForbiddenDto, ...properties }));

export const MyApiUnauthorizedResponse = (properties?: any) =>
  applyDecorators(ApiUnauthorizedResponse({ type: UnauthorizedDto, ...properties }));

export class NotFoundResponse {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Not found' })
  message: string;

  @ApiProperty({ default: 'Not found' })
  error?: string;
}
export const MyApiNotFoundResponse = (properties?: any) =>
  applyDecorators(ApiNotFoundResponse({ type: NotFoundResponse, ...properties }));

export class MyPagination {
  @ApiProperty({ default: 1, required: false })
  page?: number;

  @ApiProperty({ default: 10, required: false })
  limit?: number;
}
export const MyApiPaginatedQuery = () => applyDecorators(ApiQuery({ type: MyPagination }));

export const MyApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  properties?: any,
) => {
  return applyDecorators(
    ApiOkResponse({
      ...properties,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
