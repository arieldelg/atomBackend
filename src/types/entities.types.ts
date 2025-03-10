export interface UserPropsEntity {
  email: string;
  role: Role;
  emailValidated: boolean;
  createdAt: Date;
  uid: string;
  displayName: string;
  token?: string;
}

export type Role = "admin" | "user" | "guest";
