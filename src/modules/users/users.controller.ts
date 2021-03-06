import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  MyApiForbiddenResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { UserInfoDto } from './dto/user-info.dto';
import { USER_MESSAGES } from './common/users.constant';
import { UpdateUserAvatarDto, UpdateUserDto } from './dto/user-update.dto';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/admin')
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiOkResponse({ type: UserInfoDto, description: USER_MESSAGES.SUCCESS })
  async getAdmin() {
    return this.usersService.getAdminProfile();
  }

  @Put()
  @ApiOperation({ summary: 'Update basic user profile' })
  @ApiOkResponse({ type: UserInfoDto, description: USER_MESSAGES.SUCCESS })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @AuthUser() user: User) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Put('/avatar')
  @ApiOperation({ summary: 'Update avatar for user' })
  @ApiOkResponse({ type: UserInfoDto, description: USER_MESSAGES.SUCCESS })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateAvatar(
    @Body(new ValidationPipe()) updateUserAvatarDto: UpdateUserAvatarDto,
    @AuthUser() user: User,
  ) {
    return this.usersService.updateAvatar(user.id, updateUserAvatarDto.avatar);
  }
}
