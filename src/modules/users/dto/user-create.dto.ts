import { UserRole } from '@src/modules/users/enums/role.enum';

export class CreateUserDto {
  firstName: string;
  lastName?: string;
  avatar?: string;
  email: string;
  phone?: string;
  role?: UserRole;
  password?: string;
}
