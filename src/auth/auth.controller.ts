import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthCredentialDto } from './dto/auth.credential.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }
}
