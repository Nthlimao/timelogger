import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { AuthContextType } from "@/contexts/auth/auth.types";
import { authLogin } from "../services/auth.service";
import { AuthPayload } from "@/types/Auth";
import { User } from "@/types/User";

const useAuth = () => {
  const { dispatch, actions, state } = useContext(
    AuthContext
  ) as AuthContextType;
  const { setToken: ctxSetToken, setUser: ctxSetUser } = actions;

  const setToken = (token: string) => {
    dispatch(ctxSetToken(token));
  };

  const setUser = (user: User) => {
    dispatch(ctxSetUser(user));
  };

  const login = async (payload: AuthPayload) => {
    try {
      const response = await authLogin(payload);

      if (!axios.isAxiosError(response)) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        // TODO: REDIRECT
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    setToken,
    setUser,
    login,
    ...state,
  };
};

export default useAuth;
