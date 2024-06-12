import api from "./api";
import { Customer, User } from "@/types/User";
import { AuthHeaders } from "@/types/Auth";
import { AxiosResponse } from "axios";

export const getDetails = async (
  headers: AuthHeaders
): Promise<AxiosResponse<User>> => {
  const response = await api.get<User>("/users/details", { headers });
  return response;
};

export const getCustomers = async (
  headers: AuthHeaders
): Promise<AxiosResponse<Customer[]>> => {
  const response = await api.get<Customer[]>("users/customers", {
    headers,
  });
  return response;
};
