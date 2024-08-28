import { Inject, Service } from "typedi";

import IUsersRepository from "../repositories/IUsersRepository";
import User, { UserAccess } from "../database/typeorm/entities/User";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  userId: string;
}

@Service()
export default class ListUsers {
  constructor(
    @Inject("typeorm.usersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ApiError('Não autorizado!', 401);

    if (user.access !== UserAccess.ADMIN) throw new ApiError('Você não pode acessar este recurso!', 401);

    const users = await this.usersRepository.list();

    return users.filter(item => item.id !== userId);
  }
}
