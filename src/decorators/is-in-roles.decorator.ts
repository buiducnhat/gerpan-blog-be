import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '@src/modules/users/entities/user.entity';
import { UserRole } from '@src/modules/users/enums/role.enum';

export const IsInRoles = createParamDecorator((data: UserRole[], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: User = request.user;
  if (!user || !user.role) {
    return false;
  }
  return data.includes(user.role);
});
