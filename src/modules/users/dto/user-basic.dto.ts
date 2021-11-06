import { PickType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class BasicUserDto extends PickType(User, [
  'id',
  'firstName',
  'lastName',
  'avatar',
  'lastLogin',
] as const) {}
