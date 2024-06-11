import { createContext, useEffect, useReducer } from "react";

import AuthReducer from "./auth.reducer";
import AuthActions from "./auth.actions";
import InitialState from "./auth.state";
import { AuthStateType } from "./auth.types";

const AuthContext = createContext({});

const initializer = (initialState: AuthStateType) => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState ? JSON.parse(serializedState) : initialState;
  } catch (error) {
    console.error("Error retrieving LocalStorage state:", error);
    return initialState;
  }
};

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, InitialState, initializer);

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("authState", serializedState);
    } catch (error) {
      console.error("Error retrieving LocalStorage state:", error);
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, actions: AuthActions, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
