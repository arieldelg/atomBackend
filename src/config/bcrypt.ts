import { compareSync, genSaltSync, hashSync } from "bcrypt";
export class Bcrypt {
  static hashPassword(password: string) {
    const salt = genSaltSync();

    return hashSync(password, salt);
  }

  static comparePassword(password: string, hashed: string) {
    return compareSync(password, hashed);
  }
}
