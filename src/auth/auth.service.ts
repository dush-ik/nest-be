import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { AuthCredentialDto } from './dto/auth.credential.dto.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken, JwtPayload } from './jwt-payload-interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository, 
    private readonly jwtService: JwtService) 
  {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDto);
  }
  
  async signIn(authCredentialsDto: AuthCredentialDto): Promise<AccessToken> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken }; 
    } else {
      throw new UnauthorizedException('Invalid credentials'); 
    }
  }
}
