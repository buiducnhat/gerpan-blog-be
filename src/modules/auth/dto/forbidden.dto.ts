import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenDto {
  @ApiProperty({ default: 403 })
  status: number;

  @ApiProperty({ default: 'Forbidden' })
  message: string;

  @ApiProperty({ default: 'Forbidden' })
  error?: string;
}
