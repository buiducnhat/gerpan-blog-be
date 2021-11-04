import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@src/commons/constants';
import { UserInfoDto } from '@modules/users/dto/user-info.dto';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(50)
  password: string;
}

export class RegisterResponseDto {
  token: string;
  user: UserInfoDto;
}
