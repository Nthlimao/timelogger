import { Role } from "./User";

export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type AuthHeaders = {
  Authorization?: string;
};
