
import { Repository } from "typeorm";

import { connection } from "../../../../../database/connection";
import { IUsersDTO } from "../../../dtos";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = connection.getRepository(User);
  }

  public async create(data: IUsersDTO): Promise<User> {
    const user = {
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      registration: data.registration,
    };

    const createdUser = this.ormRepository.create(user);

    await this.ormRepository.save(createdUser);

    return createdUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { email } })) || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) || undefined;
  }

  public async update(user: User, data: Partial<IUsersDTO>): Promise<User> {
    const updateData = {
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      last_active: data.lastActive,
      registration: data.registration,
      access: data.access,
    };

    const updatedUser = this.ormRepository.merge(user, updateData);

    await this.ormRepository.save(updatedUser);

    return updatedUser;
  }

  public async findByRegistration(registration: string): Promise<User | undefined> {
    return (await this.ormRepository.findOne({
      where: { registration, },
    })) || undefined;
  }

  public async list(relations: string[] = []): Promise<User[]> {
    return this.ormRepository.find({ relations });
  }
}
