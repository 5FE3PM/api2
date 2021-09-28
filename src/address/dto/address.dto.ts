import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  firstAddress: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  secondAddress: string;

  @IsNumber()
  regionId: number;
}
