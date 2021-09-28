import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { AddressService } from 'src/address/address.service';
import { RegionsService } from 'src/regions/regions.service';
import { ProvidersService } from 'src/providers/providers.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ClientsService } from 'src/clients/clients.service';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [BusinessController],
  providers: [
    BusinessService,
    AddressService,
    RegionsService,
    CategoriesService,
    ClientsService,
    EmailsService,
    ProvidersService,
    UsersService,
  ],
})
export class BusinessModule {}
