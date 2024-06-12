import api from "./api";
import { AxiosResponse } from "axios";
import { AuthHeaders } from "@/types/Auth";
import { ProjectDTO, ProjectFormParams } from "../types/Project";
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

export const update = async (
  id: string,
  payload: ProjectFormParams,
  headers: AuthHeaders
): Promise<AxiosResponse> => {
  const response = await api.put(`/projects/${id}`, payload, {
    headers,
  });
  return response;
};

export const create = async (
  payload: ProjectFormParams,
  headers: AuthHeaders
): Promise<AxiosResponse> => {
  const response = await api.post("/projects/", payload, {
    headers,
  });
  return response;
};

export const deleteProject = async (
  id: string,
  headers: AuthHeaders
): Promise<AxiosResponse> => {
  const response = await api.delete(`/projects/${id}`, {
    headers,
  });
  return response;
};
