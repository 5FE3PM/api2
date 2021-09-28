import { IsNotEmpty } from 'class-validator';

export class AuthProviderDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
