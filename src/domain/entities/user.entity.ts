import { UserPropsEntity } from "../../types/entities.types";

export class UserEntity {
  public readonly email: string;
  public readonly role: string;
  public readonly emailValidated: boolean;
  public readonly createdAt: Date;
  public readonly uid: string;
  public readonly displayName: string;
  public readonly token: string;
  constructor({
    email,
    role,
    emailValidated,
    createdAt,
    uid,
    displayName,
    token,
  }: UserPropsEntity) {
    this.email = email;
    this.role = role;
    this.emailValidated = emailValidated;
    this.createdAt = createdAt;
    this.uid = uid;
    this.displayName = displayName;
    this.token = token ?? "";
  }
}
