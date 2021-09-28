import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Provider } from './provider.entity';
import { Address } from 'src/address/address.entity';
import { Business } from 'src/business/entities/business.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProvidersService {
  async getAllProviders(): Promise<Provider[]> {
    let providers = await Provider.createQueryBuilder('providers')
      .leftJoinAndSelect('providers.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .getMany();
    providers = providers.map((provider: Provider) => {
      delete provider.password;
      return provider;
    });
    return providers;
  }

  async getProviderById(id: number): Promise<Provider> {
    const provider = await this.findById(id);
    delete provider.password;
    return provider;
  }

  async findById(id: number): Promise<Provider> {
    const provider = await Provider.createQueryBuilder('provider')
      .leftJoinAndSelect('provider.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('provider.id = :id', { id })
      .getOne();
    if (!provider) {
      throw new NotFoundException();
    }
    return provider;
  }

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    try {
      const region = await Region.findOne(Number(createProviderDto.regionId));
      if (!region) {
        throw new NotFoundException(`Region not found`);
      }
      const address = Address.create({
        firstAddress: createProviderDto.firstAddress,
        secondAddress: createProviderDto.secondAddress,
        region,
      });
      await address.save();
      const provider = Provider.create({
        ...createProviderDto,
        card: createProviderDto.card === 'true' ? true : false,
        cash: createProviderDto.cash === 'true' ? true : false,
        offersServices:
          createProviderDto.offersServices === 'true' ? true : false,
        sellProducts: createProviderDto.sellProducts === 'true' ? true : false,
        address,
      });
      await provider.save();
      delete provider.password;
      const category = await Category.findOne(
        createProviderDto.businessCategoryId,
      );
      if (!category) {
        throw new NotFoundException(`Category not found`);
      }
      const business = Business.create({
        name: createProviderDto.businessName,
        logo: createProviderDto.businessLogo,
        category: category,
        provider: provider,
      });
      await business.save();
      return provider;
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        throw new ConflictException(error.sqlMessage);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByEmail(email: string): Promise<Provider> {
    const provider = await Provider.findOne({
      where: {
        email: email,
      },
    });

    // if user was not found, then throw a not found exception
    if (!provider) {
      throw new NotFoundException(`Email not registered`);
    }

    return provider;
  }
}
