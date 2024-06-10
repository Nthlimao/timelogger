import { User } from "@internal-types/User";

export enum AuthActionOptions {
  setUser = "SET_USER",
  setToken = "SET_TOKEN",
  logout = "LOGOUT",
}

export type AuthActionsType = {
  setUser: (payload: User) => void;
  setToken: (payload: string) => void;
  logout: () => void;
};

export type AuthStateType = {
  user?: User;
  token?: string;
};

export type AuthContextType = {
  state: AuthStateType;
  actions: AuthActionsType;
  dispatch: any;
};
