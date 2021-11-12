import {
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

import { ForbiddenDto } from '@modules/auth/dto/forbidden.dto';
import { UnauthorizedDto } from '@src/modules/auth/dto/unauthorized.dto';
import { NotFoundResponseDto } from '@src/common/dto/notfound.dto';
import {
  PaginationParamsDto,
  PaginationDto,
  PaginationMetaDto,
  PaginationWithSearchParamsDto,
} from '@src/modules/pagination/dto/pagination.dto';

export const MyApiForbiddenResponse = (properties?: any) =>
  applyDecorators(ApiForbiddenResponse({ type: ForbiddenDto, ...properties }));

export const MyApiUnauthorizedResponse = (properties?: any) =>
  applyDecorators(ApiUnauthorizedResponse({ type: UnauthorizedDto, ...properties }));

export const MyApiNotFoundResponse = (properties?: any) =>
  applyDecorators(ApiNotFoundResponse({ type: NotFoundResponseDto, ...properties }));

interface IMyApiPaginatedQueryOptions {
  withSearch: boolean;
}
export const MyApiPaginatedQuery = (options?: IMyApiPaginatedQueryOptions) =>
  applyDecorators(
    ApiQuery({ type: options?.withSearch ? PaginationWithSearchParamsDto : PaginationParamsDto }),
  );

export const MyApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  properties?: any,
) => {
  return applyDecorators(
    ApiOkResponse({
      ...properties,
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginationDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                $ref: getSchemaPath(PaginationMetaDto),
              },
            },
          },
        ],
      },
    }),
  );
};
