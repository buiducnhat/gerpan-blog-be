import { OmitType } from '@nestjs/swagger';

import { BasicSocialDto } from '../dto/social-basic.dto';
import { User } from '../entities/user.entity';

export class UserInfoDto extends OmitType(User, [
  'articles',
  'articleComments',
  'socials',
  'password',
] as const) {
  socials: BasicSocialDto[];
}
