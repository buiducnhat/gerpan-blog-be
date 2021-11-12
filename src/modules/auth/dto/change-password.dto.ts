import { IsString, MaxLength, MinLength } from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@src/common/constants';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(50)
  newPassword: string;
}
