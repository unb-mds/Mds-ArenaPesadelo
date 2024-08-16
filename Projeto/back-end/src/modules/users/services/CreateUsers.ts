import { Inject, Service } from "typedi";

import { IUsersDTO } from "../dtos";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../../../providers/HashProvider/models/IHashProvider";
import ApiError from "../../../infra/errors/ApiError";
import User from "../database/typeorm/entities/User";

type IRequest = IUsersDTO;

@Service()
export default class CreateUsers {
  constructor(
    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,

    @Inject('hashProviders.bcrypt')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const userData = { ...data };

    const emailAlreadyInUse = await this.usersRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyInUse) throw new ApiError('Este email está em uso!');

    const hashedPassword = await this.hashProvider.hash(userData.password);

    userData.password = hashedPassword;

    const user = await this.usersRepository.create(userData);

    return user;
  }
}
