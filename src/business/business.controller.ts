import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { AddCategoryBusinessDto } from './dto/add-category-business.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Provider } from 'src/providers/provider.entity';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  index() {
    return this.businessService.getAllBusinesses();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.businessService.getBusinessById(Number(id));
  }

  // @Post(':id/addCategory')
  // addCategory(
  //   @Param('id') id: string,
  //   @Body() addCategoryBusinessDto: AddCategoryBusinessDto,
  // ) {
  //   console.log(id);
  //   return this.businessService.addCategory(
  //     Number(id),
  //     Number(addCategoryBusinessDto.categoryId),
  //   );
  // }

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }
}
