import { Bcrypt } from "../../config/bcrypt";

export class AuthService {
  public registerPassword(password: string) {
    const hashPassword = Bcrypt.hashPassword(password);
    return hashPassword;
  }

  public comparePassword(password: string, dbPassword: string) {
    return Bcrypt.comparePassword(password, dbPassword);
  }
}
