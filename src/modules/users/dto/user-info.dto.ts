import { BasicSocialDto } from '@src/modules/users/dto/social-basic.dto';
import { Role } from '@src/modules/users/enums/role.enum';

export class UserInfoDto {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  role: Role;
  lastLogin: Date;
  createdAt: Date;
  updateAt: Date;
  socials: BasicSocialDto[];
}
