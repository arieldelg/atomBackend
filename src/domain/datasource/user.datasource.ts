import { GetUserProps, UserProps } from "../../types/user.types";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract createUser(user: UserProps): Promise<UserEntity>;
  abstract getUser(user: GetUserProps): Promise<UserEntity>;
}
