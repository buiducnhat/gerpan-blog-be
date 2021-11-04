import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ForbiddenDto } from '@modules/auth/dto/forbidden.dto';
import { UnauthorizedDto } from '@src/modules/auth/dto/unauthorized.dto';

export const MyApiForbiddenResponse = (properties?: any) =>
  ApiForbiddenResponse({ type: ForbiddenDto, ...properties });

export const MyApiUnauthorizedResponse = (properties?: any) =>
  ApiUnauthorizedResponse({ type: UnauthorizedDto, ...properties });
