import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'Nome deve conter apenas letras' })
  name: string;

  @IsEmail({}, { message: 'Email deve ter formato válido' })
  email: string;

  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  @Length(10, 2000, { message: 'Mensagem deve ter entre 10 e 2000 caracteres' })
  message: string;
}
