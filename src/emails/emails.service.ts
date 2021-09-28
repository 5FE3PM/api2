import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Client } from 'src/clients/client.entity';
import { Provider } from 'src/providers/provider.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailsService {
  async create(
    createEmailDto: CreateEmailDto,
    provider?: Provider,
    client?: Client,
  ) {
    try {
      let email;
      let data: { email: string; provider?: Provider; client?: Client } = {
        email: createEmailDto.email,
      };
      if (provider) {
        data = { ...data, provider: provider };
        email = Email.create(data);
      } else {
        data = { ...data, client: client };
        email = Email.create(data);
      }
      await email.save();
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('That email is already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  async findEmail(email: string) {
    const emailFound = await Email.find({
      where: {
        email: email,
      },
    });
    if (emailFound) {
      throw new ConflictException('That email already exists');
    }
    return false;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
