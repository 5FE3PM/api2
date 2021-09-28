import { IsNumber } from 'class-validator';

export class AddCategoryBusinessDto {
  @IsNumber()
  categoryId: number;
}
