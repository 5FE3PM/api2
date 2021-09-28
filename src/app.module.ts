import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { AddressModule } from './address/address.module';
import { ProvidersModule } from './providers/providers.module';
import { RegionsModule } from './regions/regions.module';
import { CategoriesModule } from './categories/categories.module';
import { BusinessModule } from './business/business.module';

// Entities
import { User } from './users/user.entity';
import { Address } from './address/address.entity';
import { Region } from './regions/entities/region.entity';
import { Client } from './clients/client.entity';
import { Provider } from './providers/provider.entity';
import { Business } from './business/entities/business.entity';
import { Category } from './categories/entities/category.entity';
import { EmailsModule } from './emails/emails.module';
import { Email } from './emails/entities/email.entity';

const entities = [
  User,
  Address,
  Region,
  Client,
  Provider,
  Business,
  Category,
  Email,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    AddressModule,
    ProvidersModule,
    BusinessModule,
    CategoriesModule,
    RegionsModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
