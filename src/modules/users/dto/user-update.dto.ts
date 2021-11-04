import { Role } from '@src/modules/users/enums/role.enum';

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone?: string;
  role?: Role;
  password: string;
}
