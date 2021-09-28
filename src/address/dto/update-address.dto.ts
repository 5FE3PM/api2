import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
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
