import { UserProps } from "../../../types/user.types";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface CreateUserInt {
  execute({ email, displayName, password }: UserProps): Promise<UserEntity>;
}

export class CreateUser implements CreateUserInt {
  constructor(private readonly appRepository: UserRepository) {}
  execute({ email, displayName, password }: UserProps): Promise<UserEntity> {
    return this.appRepository.createUser({ email, displayName, password });
  }
}
