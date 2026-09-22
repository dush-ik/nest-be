import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthCredentialDto } from './dto/auth.credential.dto.js';
import { AccessToken } from './jwt-payload-interface.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<AccessToken> {
    return await this.authService.signIn(authCredentialDto);
  }
}
