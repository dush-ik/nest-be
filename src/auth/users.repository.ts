
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "./user.entity.js";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(username: string, hashedPassword: string): Promise<User> {

    const user = this.create({ username, password: hashedPassword });
    try {
      return await this.save(user);
    } catch (error: any) {
      // duplicate username error code in PostgreSQL
      if (error.code === "23505") {
        throw new Error('DUPLICATE_USERNAME');
      } else {
        throw error;
      }
    }
  }

}