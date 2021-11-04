import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@src/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserInfoDto } from '../users/dto/user-info.dto';
import { Role } from '../users/enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { ValidationPipe } from '@src/pipes/validation.pipe';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { IRequestUser } from './interfaces/req-user.interface';
import { AUTH_MESSAGE } from './common/auth.constant';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto, description: AUTH_MESSAGE.SUCCESS })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: RegisterResponseDto,
    description: AUTH_MESSAGE.SUCCESS,
  })
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({ status: HttpStatus.OK, type: UserInfoDto, description: AUTH_MESSAGE.SUCCESS })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@AuthUser() authUser: UserInfoDto) {
    return authUser;
  }

  @Get('/admin')
  @ApiOperation({ summary: 'Admin', description: 'Only user with role Admin can access' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async admin() {
    return { message: 'Admin route for testing' };
  }

  @Get('/facebook')
  @ApiOperation({ summary: 'Login with Facebook' })
  @UseGuards(FacebookAuthGuard)
  async loginWithFacebook() {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @ApiOperation({ summary: 'Redirect of Login with Facebook' })
  @UseGuards(FacebookAuthGuard)
  async loginFacebookRedirect(@Req() req: IRequestUser): Promise<any> {
    return req.user;
  }

  @Get('/google')
  @ApiOperation({ summary: 'Login with Google' })
  @UseGuards(GoogleAuthGuard)
  async loginWithGoogle() {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @ApiOperation({ summary: 'Redirect of Login with Google' })
  @UseGuards(GoogleAuthGuard)
  async loginGoogleRedirect(@Req() req: IRequestUser): Promise<any> {
    return req.user;
  }
}
