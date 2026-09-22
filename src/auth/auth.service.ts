import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { AuthCredentialDto } from './dto/auth.credential.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDto);
  }
}
