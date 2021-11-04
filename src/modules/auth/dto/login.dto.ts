import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '@src/modules/users/enums/role.enum';
import { BasicSocialDto } from '@src/modules/users/dto/social-basic.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    phone: string;
    role: UserRole;
    lastLogin: Date;
    createdAt: Date;
    updateAt: Date;
    socials: BasicSocialDto[];
  };
}
