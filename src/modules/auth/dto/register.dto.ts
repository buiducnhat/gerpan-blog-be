import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@src/common/constants';
import { Role } from '@src/modules/users/enums/role.enum';
import { BasicSocialDto } from '@src/modules/users/dto/social-basic.dto';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  avatar?: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsPhoneNumber('VI')
  phone?: string;

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}

export class RegisterResponseDto {
  token: string;
  user: {
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
  };
}
