import api from "./api";
import { User } from "@/types/User";
import { AuthHeaders } from "@/types/Auth";
import { AxiosResponse } from "axios";

export const getDetails = async (
  headers: AuthHeaders
): Promise<AxiosResponse<User>> => {
  const response = await api.get<User>("/users/details", { headers });
  return response;
};
