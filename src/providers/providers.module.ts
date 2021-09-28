import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { AddressService } from '../address/address.service';
import { RegionsService } from '../regions/regions.service';
import { BusinessService } from 'src/business/business.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ClientsService } from 'src/clients/clients.service';
import { UsersService } from 'src/users/users.service';
import { EmailsService } from 'src/emails/emails.service';

@Module({
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    AddressService,
    RegionsService,
    BusinessService,
    CategoriesService,
    ClientsService,
    UsersService,
    EmailsService,
  ],
})
export class ProvidersModule {}
