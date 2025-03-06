export interface UserProps {
  email: string;
  displayName: string;
  password: string;
}

export interface GetUserProps {
  email: string;
}

export interface EmailVerification {
  ok: boolean;
  message: string;
}
