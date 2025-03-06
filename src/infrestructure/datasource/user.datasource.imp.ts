import { auth } from "../../config/firebase";
import { UserDatasource, CustomErrors, UserEntity } from "../../domain";
import {
  EmailVerification,
  GetUserProps,
  UserProps,
} from "../../types/user.types";

export class UserDataSourceImp implements UserDatasource {
  async getUser({ email }: GetUserProps): Promise<UserEntity> {
    try {
      const user = await auth.getUserByEmail(email);

      return new UserEntity({
        createdAt: new Date(user.metadata.creationTime),
        email: user.email!,
        emailValidated: user.emailVerified,
        role: "admin",
        uid: user.uid,
        displayName: user.displayName ?? "user",
      });
    } catch (error) {
      if (error instanceof CustomErrors) throw error;
      throw CustomErrors.internalErrorServer("Internal Error Server: " + error);
    }
  }

  /**
   *
   * @param param0
   * @returns
   * @deprecated usar firebase auth desde el cliente
   */
  async createUser({
    displayName,
    email,
    password,
  }: UserProps): Promise<UserEntity> {
    try {
      const user = await auth.createUser({
        email,
        displayName,
        password,
      });

      const token = await auth.createCustomToken(user.uid, {
        aud: "interview-21bd5",
      });
      return new UserEntity({
        email: user.email!,
        role: "user",
        emailValidated: user.emailVerified,
        createdAt: new Date(user.metadata.creationTime),
        uid: user.uid,
        displayName: user?.displayName ?? "user",
        token: token,
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server: " + error);
    }
  }

  async verifyUser(user: GetUserProps): Promise<EmailVerification> {
    try {
      const emailExist = await auth.getUserByEmail(user.email);

      if (!emailExist) {
        throw CustomErrors.badRequest("User do not exist please register");
      }
      return {
        ok: true,
        message: "User exist please login",
      };
    } catch (error) {
      if (error instanceof CustomErrors) throw error;
      throw CustomErrors.internalErrorServer("Internal Error Server: " + error);
    }
  }
}
