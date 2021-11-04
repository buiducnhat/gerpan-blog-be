import { SocialProvider } from '@modules/users/enums/social-provider.enum';

export class SocialDto {
  socialId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone?: string;
  provider: SocialProvider;
}
