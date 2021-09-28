import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { Address } from './address.entity';
import { Region } from '../regions/entities/region.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  async create(addressDto: AddressDto): Promise<Address> {
    const region = await Region.findOne(Number(addressDto.regionId));
    if (!region) {
      throw new NotFoundException(`Region not found`);
    }
    const address = Address.create({
      firstAddress: addressDto.firstAddress,
      secondAddress: addressDto.secondAddress,
      region,
    });
    await address.save();
    return address;
  }

  async getAllAddress(): Promise<Address[]> {
    const addresses = await Address.find({ relations: ['region'] });
    return addresses;
  }

  async getById(id: number): Promise<Address> {
    const address = await Address.findOne(id, { relations: ['region'] });
    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
    return address;
  }

  async update(id: number, addressDto: UpdateAddressDto): Promise<Address> {
    const region = await Region.findOne(Number(addressDto.regionId));
    if (!region) {
      throw new NotFoundException(`Region not found`);
    }
    const address = await Address.findOne(id);
    address.firstAddress = addressDto.firstAddress;
    address.secondAddress = addressDto.secondAddress;
    address.region = region;
    await address.save();
    return address;
  }

  async delete(id: number): Promise<void> {
    const address = await Address.findOne(id);
    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
    await address.remove();
  }
}
