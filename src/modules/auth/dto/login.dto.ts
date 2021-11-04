import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserInfoDto } from '@modules/users/dto/user-info.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: UserInfoDto;
}
