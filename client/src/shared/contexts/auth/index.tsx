import { createContext, useContext, useReducer } from "react";

import AuthReducer from "./auth.reducer";
import AuthActions from "./auth.actions";
import InitialState from "./auth.state";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, InitialState);
  return (
    <AuthContext.Provider value={{ state, actions: AuthActions, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
