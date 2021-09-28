import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from 'src/address/address.entity';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AddressService } from '../address/address.service';
import { RegionsService } from '../regions/regions.service';

@Injectable()
export class ClientsService {
  constructor(
    private addressService: AddressService,
    private regionsService: RegionsService,
  ) {}

  async getAllClients(): Promise<Client[]> {
    let clients = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .getMany();
    clients = clients.map((client: Client) => {
      delete client.password;
      return client;
    });
    return clients;
  }

  async getClientById(id: number) {
    const client = await this.findById(id);
    delete client.password;
    return client;
  }

  async create(clientDto: ClientDto): Promise<Client> {
    const region = await this.regionsService.findById(clientDto.regionId);
    const address = Address.create({
      firstAddress: clientDto.firstAddress,
      secondAddress: clientDto.secondAddress,
      region,
    });
    await address.save();
    const client = Client.create({ ...clientDto, address });
    await client.save();
    delete client.password;
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findById(id);

    if (updateClientDto.regionId) {
      // find the region to update the address with the new one
      const region = await this.regionsService.findById(
        Number(updateClientDto.regionId),
      );

      // find the address to update
      const address = await this.addressService.getById(
        Number(client.address.id),
      );

      address.firstAddress = updateClientDto.firstAddress;
      address.secondAddress = updateClientDto.secondAddress;
      address.region = region;
      await address.save();
    }

    // update the client
    client.fullname = updateClientDto.fullname;
    client.email = updateClientDto.email;
    client.phone = updateClientDto.phone;
    client.validated = updateClientDto.validated;
    await client.save();
    return await this.findById(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const client = await this.findById(id);
    await Client.delete(client);
    return {
      message: 'Client deleted',
    };
  }

  private async findById(id: number): Promise<Client> {
    // find the client to get the address id
    const client = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('address.region', 'region')
      .where('client.id = :id', { id })
      .getOne();

    // if client was not found, then throw a not found exception
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await Client.findOne({
      where: {
        email: email,
      },
    });

    // if user was not found, then throw a not found exception
    if (!client) {
      throw new NotFoundException(`Email not registered`);
    }

    return client;
  }
}
