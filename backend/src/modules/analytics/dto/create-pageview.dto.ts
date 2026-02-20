import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreatePageViewDto {
  @IsString()
  @MaxLength(255)
  page: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  referrer?: string;
}
