import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '@src/modules/users/users.service';
import { JwtPayload } from '@modules/auth/dto/jwt-payload.dto';
import { IAuthConfig } from '@src/configs/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService<IAuthConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwtSecretKey'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findOne(payload.userId);
  }
}
