import { UserAccess } from "../../../utils/enums";

export interface IUser {
  id: string;
  full_name: string;
  email: string;
  access: UserAccess;
  access_label: string;
}
