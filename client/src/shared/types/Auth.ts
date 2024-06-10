import { Role } from "./User";

export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    role: Role;
  };
};
