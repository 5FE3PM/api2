import { IsEmail, IsNotEmpty } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstAddress: string;

  @IsNotEmpty()
  secondAddress: string;

  @IsNotEmpty()
  regionId: number;
}
