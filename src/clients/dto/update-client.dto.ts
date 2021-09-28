import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @Length(10)
  @IsOptional()
  phone: string;

  @IsBoolean()
  @IsOptional()
  validated: null;

  @IsString()
  @IsOptional()
  firstAddress: string;

  @IsString()
  @IsOptional()
  secondAddress: string;

  @IsNumber()
  @IsOptional()
  regionId: number;
}
