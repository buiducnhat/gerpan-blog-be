import { SocialProvider } from '@modules/users/enums/social-provider.enum';

export class BasicSocialDto {
  id: number;
  socialId: string;
  provider: SocialProvider;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  createdAt: Date;
  updateAt: Date;
}
