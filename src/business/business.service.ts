import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Business } from './entities/business.entity';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class BusinessService {
  constructor(private providersService: ProvidersService) {}

  async getAllBusinesses(): Promise<Business[]> {
    return await Business.createQueryBuilder('business')
      .leftJoinAndSelect('business.provider', 'provider')
      .leftJoinAndSelect('business.category', 'category')
      .getMany();
  }

  async getBusinessById(id: number): Promise<Business> {
    return await this.findById(id);
  }

  async findById(id: number): Promise<Business> {
    const business = await Business.findOne(id, {
      relations: ['address', 'provider'],
    });
    if (!business) {
      throw new NotFoundException();
    }
    return business;
  }

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    try {
      const provider = await this.providersService.findById(
        createBusinessDto.providerId,
      );
      const business = Business.create({
        name: createBusinessDto.name,
        logo: createBusinessDto.logo,
        provider,
      });
      await business.save();
      return business;
    } catch (error) {
      if (error.errno == 1062) {
        throw new ConflictException(`That business name is already in use`);
      } else {
        console.log(error);
      }
    }
  }

  // async addCategory(businessId: number, categoryId: number): Promise<string> {
  //   const category = await Category.findOne(categoryId);
  //   const business = await Business.findOne(businessId, {
  //     relations: ['categories'],
  //   });
  //   if (!category) {
  //     throw new NotFoundException(`Category not found`);
  //   }
  //   if (!business) {
  //     throw new NotFoundException(`Business not found`);
  //   }
  //   if (business.categories.includes(category)) {
  //     return 'This business already has that category';
  //   }
  //   business.categories.push(category);
  //   await business.save();
  //   return `Category "${category.name}" added`;
  // }
}
