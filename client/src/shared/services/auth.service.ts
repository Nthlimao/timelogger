import { AxiosResponse } from "axios";
import api from "./api";
import { AuthPayload, AuthResponse } from "@/types/Auth";

export const authLogin = async (
  payload: AuthPayload
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response;
};
