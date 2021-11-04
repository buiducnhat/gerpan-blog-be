import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({ default: 403 })
  status: number;

  @ApiProperty({ default: 'Forbidden' })
  message: string;

  @ApiProperty({ default: 'Forbidden' })
  error?: string;
}
