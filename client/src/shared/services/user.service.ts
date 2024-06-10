import api from "./api";
import { User } from "@internal-types/User";

export const getDetails = async (): Promise<User> => {
  const response = await api.get<User>("/users/details");
  return response.data;
};
