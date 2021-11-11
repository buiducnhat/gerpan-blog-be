import { IsBoolean } from 'class-validator';

export class ChangePublishedAticleDto {
  @IsBoolean()
  published: boolean;
}
