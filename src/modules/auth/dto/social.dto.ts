import { OmitType } from '@nestjs/swagger';
import { Social } from '@src/modules/users/entities/social.entity';

export class SocialDto extends OmitType(Social, [
  'createdAt',
  'updateAt',
  'deletedAt',
  'user',
  'id',
] as const) {
  socialId: string;
}
