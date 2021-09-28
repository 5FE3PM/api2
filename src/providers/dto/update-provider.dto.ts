import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProviderDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsBoolean()
  @IsOptional()
  validated: boolean;

  @IsBoolean()
  @IsOptional()
  cash: boolean;

  @IsBoolean()
  @IsOptional()
  card: boolean;
}
