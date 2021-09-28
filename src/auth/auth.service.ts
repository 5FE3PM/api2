import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthClientLoginDto } from './dto/auth-client-login.dto';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/client.entity';
import { ProvidersService } from '../providers/providers.service';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private providersService: ProvidersService,
    private jwtService: JwtService,
  ) {}

  async clientLogin(authClientLoginDto: AuthClientLoginDto) {
    const client = await this.validateClient(authClientLoginDto);

    const payload = {
      clientId: client.id,
    };

    return {
      clientId: client.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async providerLogin(authClientLoginDto: AuthClientLoginDto) {
    const provider = await this.validateProvider(authClientLoginDto);

    const payload = {
      providerId: provider.id,
    };

    return {
      providerId: provider.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateClient(authLoginDto: AuthClientLoginDto): Promise<Client> {
    const { email, password } = authLoginDto;

    const client = await this.clientsService.findByEmail(email);
    const isValidPassword = await client.validatePassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return client;
  }

  async validateProvider(authLoginDto: AuthClientLoginDto): Promise<Client> {
    const { email, password } = authLoginDto;

    const client = await this.providersService.findByEmail(email);
    const isValidPassword = await client.validatePassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return client;
  }
}
