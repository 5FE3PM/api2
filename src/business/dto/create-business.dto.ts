import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsNumber()
  providerId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo: string;
}
