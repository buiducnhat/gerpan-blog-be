import { Request } from 'express';

import { UserInfoDto } from '@src/modules/users/dto/user-info.dto';

export interface IRequestUser extends Request {
  user: UserInfoDto;
}
