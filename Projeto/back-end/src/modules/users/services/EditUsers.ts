import { Inject, Service } from "typedi";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../database/typeorm/entities/User";
import { IUsersDTO } from "../dtos";
import ApiError from "../../../infra/errors/ApiError";
import IHashProvider from "../../../providers/HashProvider/models/IHashProvider";

interface IUpdateData extends Partial<IUsersDTO> {
  oldPassword?: string;
}

interface IRequest {
  data: IUpdateData;
  userId: string;
};

@Service()
export default class EditUsers {
  constructor(
    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,

    @Inject('hashProviders.bcrypt')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ data, userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(
      userId,
    );

    if (!user) throw new ApiError('Could not find related user to update!');

    const dataToUpdate = { ...data };

    if (data.password) {
      if (!data.oldPassword)
        throw new ApiError('You must provide your old password to update to a new one!');

      const passwordValidation = await this.hashProvider.check(
        user.password,
        data.oldPassword
      );

      if (!passwordValidation) throw new ApiError('Wrong password!');

      const updatedPass = await this.hashProvider.hash(
        data.password,
      );

      dataToUpdate.password = updatedPass;
    }

    if (data.email && data.email !== user.email) {
      const emailInUse = await this.usersRepository.findByEmail(
        data.email,
      );

      if (emailInUse) throw new ApiError('Este email está em uso por outra conta!');
    }

    const updatedUser = await this.usersRepository.update(
      user,
      dataToUpdate,
    );

    return updatedUser;
  }
}
