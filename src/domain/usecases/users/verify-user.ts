import { EmailVerification, GetUserProps } from "../../../types";
import { UserRepository } from "../../repository/user.repository";

interface VerifyUserImp {
  execute(email: GetUserProps): Promise<EmailVerification>;
}

export class VerifyUser implements VerifyUserImp {
  constructor(private readonly appRepository: UserRepository) {}
  execute(email: GetUserProps): Promise<EmailVerification> {
    return this.appRepository.verifyUser(email);
  }
}
