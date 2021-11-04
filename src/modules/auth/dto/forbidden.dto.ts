import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenDto {
  @ApiProperty({ default: 403 })
  statusCode: number;

  @ApiProperty({ default: 'Forbidden' })
  message: string;

  @ApiProperty({ default: 'Forbidden' })
  error?: string;
}
