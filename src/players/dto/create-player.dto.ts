import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
