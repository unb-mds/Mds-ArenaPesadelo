import User from "../database/typeorm/entities/User";
import { IUsersDTO } from "../dtos";

export default interface IUsersRepository {
  create(data: IUsersDTO): Promise<User>;

  list(relations?: string[]): Promise<User[]>;

  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByRegistration(registration: string): Promise<User | undefined>;

  update(user: User, data: Partial<IUsersDTO>): Promise<User>;
}
