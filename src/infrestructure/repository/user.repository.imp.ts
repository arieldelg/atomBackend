import { UserDatasource, UserRepository, UserEntity } from "../../domain";
import { GetUserProps, UserProps } from "../../types/user.types";

export class UserRepositoryImp implements UserRepository {
  constructor(private readonly appDatasource: UserDatasource) {}
  getUser({ email, password }: GetUserProps): Promise<UserEntity> {
    return this.appDatasource.getUser({ email, password });
  }
  createUser({ displayName, email, password }: UserProps): Promise<UserEntity> {
    return this.appDatasource.createUser({
      displayName,
      email,
      password,
    });
  }
}
