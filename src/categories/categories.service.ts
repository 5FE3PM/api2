import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = Category.create(createCategoryDto);
      await category.save();
      return category;
    } catch (error) {
      if (error.errno == 1062) {
        throw new ConflictException(`This category already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(): Promise<Category[]> {
    return await Category.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.findById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number): Promise<string> {
    const category = await this.findById(id);
    await Category.remove(category);
    return 'Category removed';
  }

  async findById(id: number): Promise<Category> {
    const category = await Category.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
}
