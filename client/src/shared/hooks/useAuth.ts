import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
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
        if (!axios.isAxiosError(resUser)) {
          const user = resUser.data;
          setUser(user);
          navigate("/");
        } else {
          alert(resUser.statusText);
        }
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("authState");
  };

  return {
    setToken,
    setUser,
    login,
    logout,
    getAuthenticatedHeaders,
    ...state,
  };
};

export default useAuth;
