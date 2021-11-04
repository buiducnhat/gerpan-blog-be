import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({ default: 401 })
  status: number;

  @ApiProperty({ default: 'Unauthorized' })
  message: string;

  @ApiProperty({ default: 'Unauthorized' })
  error?: string;
}
