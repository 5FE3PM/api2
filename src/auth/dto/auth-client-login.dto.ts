import { IsNotEmpty } from 'class-validator';

export class AuthClientLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
