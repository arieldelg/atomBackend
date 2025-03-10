import { GetUserProps } from "../../../types/user.types";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

interface GetUserInt {
  execute({ email }: GetUserProps): Promise<UserEntity>;
}
export class GetUser implements GetUserInt {
  constructor(private readonly appRepository: UserRepository) {}
  execute({ email }: GetUserProps): Promise<UserEntity> {
    return this.appRepository.getUser({ email });
  }
}
