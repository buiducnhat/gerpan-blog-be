import { Body, Controller, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  MyApiForbiddenResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { UserInfoDto } from './dto/user-info.dto';
import { USER_MESSAGES } from './common/users.constant';
import { UpdateUserDto } from './dto/user-update.dto';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
