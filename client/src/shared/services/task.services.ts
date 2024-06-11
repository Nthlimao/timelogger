import api from "./api";
import { AxiosResponse } from "axios";
import { AuthHeaders } from "@/types/Auth";
import { PageQueryParams, PageResult } from "../types/PagedResult";
import { Task, TaskCategory, TaskFormParams, TaskType } from "../types/Task";

export const tasks = async (
  projectId: string,
  headers: AuthHeaders,
  params?: PageQueryParams
): Promise<AxiosResponse<PageResult<Task>>> => {
  const response = await api.get<PageResult<Task>>(`/tasks/${projectId}/all`, {
    headers,
    params,
  });
  return response;
};

export const task = async (
  id: string,
  headers: AuthHeaders
): Promise<AxiosResponse<Task>> => {
  const response = await api.get<Task>(`/tasks/${id}`, {
    headers,
  });
  return response;
};

export const update = async (
  id: string,
  payload: TaskFormParams,
  headers: AuthHeaders
): Promise<AxiosResponse<Task>> => {
  const response = await api.put<Task>(`/tasks/${id}`, payload, {
    headers,
  });
  return response;
};

export const categoriesTask = async (
  headers: AuthHeaders
): Promise<AxiosResponse<TaskCategory[]>> => {
  const response = await api.get<TaskCategory[]>("/taskcategories", {
    headers,
  });
  return response;
};

export const typesTask = async (
  headers: AuthHeaders
): Promise<AxiosResponse<TaskType[]>> => {
  const response = await api.get<TaskType[]>("/tasktypes", {
    headers,
  });
  return response;
};
