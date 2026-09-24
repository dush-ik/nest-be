import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersRepository } from './users.repository.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
