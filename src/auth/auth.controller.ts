import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('client')
  async clientLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.clientLogin(authLoginDto);
  }

  @Post('provider')
  async providerLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.providerLogin(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Hello';
  }
}
