/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
