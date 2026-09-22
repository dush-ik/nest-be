
import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.entity.js";
import { AuthCredentialDto } from "./dto/auth.credential.dto.js";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      return await this.save(user);
    } catch (error: any) {
      // duplicate username error code in PostgreSQL
      if (error.code === "23505") {
        throw new ConflictException('Username already exists');
      } else {
        throw error;
      }
    }
  }
}