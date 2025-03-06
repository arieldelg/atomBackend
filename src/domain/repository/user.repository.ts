import {
  EmailVerification,
  GetUserProps,
  UserProps,
} from "../../types/user.types";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract createUser(user: UserProps): Promise<UserEntity>;
  abstract getUser(user: GetUserProps): Promise<UserEntity>;
  abstract verifyUser(email: GetUserProps): Promise<EmailVerification>;
}
