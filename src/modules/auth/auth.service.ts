import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '@src/modules/users/dto/user-create.dto';
import { UsersService } from '@modules/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';
import { IAppConfig } from '@src/configs/app.config';
import { SocialDto } from './dto/social.dto';
import { IAuthConfig } from '@src/configs/auth.config';
import { AUTH_MESSAGE } from './common/auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
  ) {}

  async register(registerDto: CreateUserDto): Promise<RegisterResponseDto> {
    if (!!(await this.usersService.findWithEmail(registerDto.email))) {
      throw new HttpException(
        { statusCode: HttpStatus.CONFLICT, message: AUTH_MESSAGE.EMAIL_EXISTS_ERROR },
        HttpStatus.CONFLICT,
      );
    }

    registerDto.password = bcrypt.hashSync(
      registerDto.password,
      this.configService.get('bcryptSalt'),
    );

    const user = await this.usersService.create(registerDto);
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email, true);
    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        { statusCode: HttpStatus.UNAUTHORIZED, message: AUTH_MESSAGE.WRONG_LOGIN_ERROR },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  async loginWithSocial(socialUserDto: SocialDto) {
    const socialUser = await this.usersService.findSocialUser(
      socialUserDto.socialId,
      socialUserDto.provider,
    );
    if (socialUser) {
      const user = await this.usersService.findOne(socialUser.user.id);
      return {
        token: this._generateToken(socialUser.user.id),
        user,
      };
    } else {
      return this.registerWithSocial(socialUserDto);
    }
  }

  async registerWithSocial(socialUserDto: SocialDto) {
    const newUser = await this.usersService.create({
      email: socialUserDto.email,
      firstName: socialUserDto.firstName,
      lastName: socialUserDto.lastName,
      avatar: socialUserDto.avatar,
    });
    const socialUser = await this.usersService.createSocial(socialUserDto, newUser.id);
    const user = await this.usersService.addSocialToUser(newUser.id, socialUser.id);

    return {
      token: this._generateToken(newUser.id),
      user,
    };
  }

  private _generateToken(userId: number | string, isLongExpires = false): string {
    return this.jwtService.sign(
      { userId },
      {
        expiresIn: isLongExpires
          ? this.configService.get('jwtLongExpiresIn')
          : this.configService.get('jwtShortExpiresIn'),
      },
    );
  }
}
