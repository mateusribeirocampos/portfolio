import { IsOptional, IsNumberString, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class ContactQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Page deve ser um número' })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: 'Page deve ser maior que 0' })
  page?: number = 1;

  @IsOptional()
  @IsNumberString({}, { message: 'Limit deve ser um número' })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: 'Limit deve ser maior que 0' })
  @Max(100, { message: 'Limit não pode ser maior que 100' })
  limit?: number = 10;
}