import { UserAccess } from "../database/typeorm/entities/User";

export interface IUsersDTO {
  fullName: string;
  email: string;
  password: string;
  lastActive?: number;
  registration?: string;
  access?: UserAccess;
}
