import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

import { IAuthConfig } from '@src/configs/auth.config';
import { SocialDto } from '@modules/auth/dto/social.dto';
import { AuthService } from '@modules/auth/auth.service';
import { SocialProvider } from '@modules/users/enums/social-provider.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<IAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GGAppId'),
      clientSecret: configService.get('GGAppSecretKey'),
      callbackURL: 'http://localhost:4000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
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
