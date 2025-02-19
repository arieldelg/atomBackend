import { auth } from "../../config/firebase";
import { UserDatasource, CustomErrors, UserEntity } from "../../domain";
import { GetUserProps, UserProps } from "../../types/user.types";

export class UserDataSourceImp implements UserDatasource {
  async getUser({ email }: GetUserProps): Promise<UserEntity> {
    try {
      const user = await auth.getUserByEmail(email);
      
      return new UserEntity({
        createdAt: new Date(user.metadata.creationTime),
        email: user.email!,
        emailValidated: user.emailVerified,
        role: user.customClaims?.role,
        uid: user.uid,
        displayName: user.displayName ?? "user"
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server: " + error);
    }
  }

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

      await auth.setCustomUserClaims(user.uid, {
        role: "user",
      });

      
      
      return new UserEntity({
        email: user.email!,
        role: "user",
        emailValidated: user.emailVerified,
        createdAt: new Date(user.metadata.creationTime),
        uid: user.uid,
        displayName: user?.displayName ?? "user"
      });
    } catch (error) {
      throw CustomErrors.internalErrorServer("Internal Error Server: " + error);
    }
  }
}
