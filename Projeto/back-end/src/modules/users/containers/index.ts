import Container from "typedi";

import UsersRepository from "../database/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";

Container.set<IUsersRepository>(
  'typeorm.usersRepository',
  new UsersRepository
);
