import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

import { IAuthConfig } from '@src/configs/auth.config';
import { SocialProvider } from '@modules/users/enums/social-provider.enum';
import { SocialDto } from '@modules/auth/dto/social.dto';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly configService: ConfigService<IAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('FBAppId'),
      clientSecret: configService.get('FBAppSecretKey'),
      callbackURL: 'http://localhost:4000/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, result: any, info?: any) => void,
  ): Promise<any> {
    const socialUser: SocialDto = {
      socialId: profile.id,
      provider: profile.provider as SocialProvider,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
    };
    const result = await this.authService.loginWithSocial(socialUser);

    done(null, result);
  }
}
