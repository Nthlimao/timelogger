import { AuthActionOptions, AuthStateType } from "./auth.types";

const AuthReducer = (state: AuthStateType, action: any) => {
  switch (action.type) {
    case AuthActionOptions.setUser:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionOptions.setToken:
      return {
        ...state,
        token: action.payload,
      };
    case AuthActionOptions.logout:
      return {
        ...state,
        user: undefined,
        token: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
