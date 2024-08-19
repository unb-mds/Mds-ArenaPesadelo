import { Inject, Service } from "typedi";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../../../providers/HashProvider/models/IHashProvider";
import User from "../database/typeorm/entities/User";
import ApiError from "../../../infra/errors/ApiError";
import { sign } from 'jsonwebtoken';
import jwtConfig from "../../../configs/jwtConfig";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

@Service()
export default class CreateSessions {
  constructor(
    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,

    @Inject('hashProviders.bcrypt')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new ApiError('Email ou senha incorreto(s)');

    const passwordCheck = await this.hashProvider.check(
      user.password,
      password,
    );

    if (!passwordCheck) throw new ApiError('Email ou senha incorreto(s)');

    const tokenPayload = { userId: user.id };

    const token = sign(tokenPayload, jwtConfig.secret, {
      expiresIn: jwtConfig.exp,
    });

    return { token, user };
  }
}
