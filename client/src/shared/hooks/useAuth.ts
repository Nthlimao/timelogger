import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/auth";
import { AuthContextType } from "@/contexts/auth/auth.types";
import { authLogin } from "../services/auth.service";
import { getDetails } from "../services/user.service";
import { AuthHeaders, AuthPayload } from "@/types/Auth";
import { User } from "@/types/User";

const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch, actions, state } = useContext(
    AuthContext
  ) as AuthContextType;
  const { setToken: ctxSetToken, setUser: ctxSetUser } = actions;

  const getAuthenticatedHeaders = (t?: string): AuthHeaders => ({
    Authorization: `Bearer ${t}`,
  });

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
        const { token } = response.data;
        const resUser = await getDetails(getAuthenticatedHeaders(token));
        setToken(token);
        if (!axios.isAxiosError(response)) {
          const user = resUser.data;
          setUser(user);
          navigate("/");
        } else {
          console.log(response);
        }
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
    getAuthenticatedHeaders,
    ...state,
  };
};

export default useAuth;
