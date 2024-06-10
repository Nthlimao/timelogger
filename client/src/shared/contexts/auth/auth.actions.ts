import { AuthActionOptions, AuthActionsType } from "./auth.types";

const AuthActions: AuthActionsType = {
  setUser: (payload) => ({ type: AuthActionOptions.setUser, payload }),
  setToken: (payload) => ({ type: AuthActionOptions.setToken, payload }),
  logout: () => ({ type: AuthActionOptions.logout }),
};

export default AuthActions;
