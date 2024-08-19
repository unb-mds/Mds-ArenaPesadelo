import { Inject, Service } from "typedi";
import IUsersRepository from "../repositories/IUsersRepository";
import User, { UserAccess } from "../database/typeorm/entities/User";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  userId: string;
  loggedUserId: string;
  access: UserAccess;
}

@Service()
export default class UpdateUserAccess {
  constructor(
    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const validAccesses = [1, 2];

    const requestedAccessIsValid = validAccesses.some(
      access => access === data.access
    );

    if (!requestedAccessIsValid) throw new ApiError('Invalid access!');

    const loggedUser = await this.usersRepository.findById(
      data.loggedUserId,
    );

    if (!loggedUser) throw new ApiError('Could not found logged user!', 401);

    if (loggedUser.access !== UserAccess.ADMIN) {
      throw new ApiError('Action not authorized!');
    }

    const userToUpdate = await this.usersRepository.findById(
      data.userId,
    );

    if (!userToUpdate) {
      throw new ApiError('Could not find user to grant privileges!');
    }

    const updatedUser = await this.usersRepository.update(
      userToUpdate,
      { access: data.access }
    );

    return updatedUser;
  }
}
