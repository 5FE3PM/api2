import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  index() {
    return this.providersService.getAllProviders();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.providersService.getProviderById(Number(id));
  }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
}
