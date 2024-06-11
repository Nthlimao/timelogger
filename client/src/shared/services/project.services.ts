import api from "./api";
import { AxiosResponse } from "axios";
import { AuthHeaders } from "@/types/Auth";
import { ProjectDTO } from "../types/Project";
import { PageQueryParams, PageResult } from "../types/PagedResult";

export const projects = async (
  headers: AuthHeaders,
  params?: PageQueryParams
): Promise<AxiosResponse<PageResult<ProjectDTO>>> => {
  const response = await api.get<PageResult<ProjectDTO>>("/projects", {
    headers,
    params,
  });
  return response;
};

export const project = async (
  id: string,
  headers: AuthHeaders
): Promise<AxiosResponse<ProjectDTO>> => {
  const response = await api.get<ProjectDTO>(`/projects/${id}`, {
    headers,
  });
  return response;
};
