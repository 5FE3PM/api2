import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProviderDto {
  @IsString()
  fullname: string;

  @IsString()
  @Length(10, 10)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  businessName: string;

  @IsString()
  businessLogo: string;

  @IsNumber()
  businessCategoryId: number;

  @IsBoolean()
  @IsOptional()
  validated: boolean;

  @IsString()
  cash: string;

  @IsString()
  card: string;

  @IsString()
  sellProducts: string;

  @IsString()
  offersServices: string;

  @IsString()
  validationImage: string;

  @IsString()
  firstAddress: string;

  @IsString()
  secondAddress: string;

  @IsNumber()
  regionId: number;
}
