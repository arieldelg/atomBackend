import { UserDatasource, UserRepository, UserEntity } from "../../domain";
import {
  EmailVerification,
  GetUserProps,
  UserProps,
} from "../../types/user.types";

export class UserRepositoryImp implements UserRepository {
  constructor(private readonly appDatasource: UserDatasource) {}

  getUser({ email }: GetUserProps): Promise<UserEntity> {
    return this.appDatasource.getUser({ email });
  }
  createUser({ displayName, email, password }: UserProps): Promise<UserEntity> {
    return this.appDatasource.createUser({
      displayName,
      email,
      password,
    });
  }
  verifyUser(email: GetUserProps): Promise<EmailVerification> {
    return this.appDatasource.verifyUser(email);
  }
}
