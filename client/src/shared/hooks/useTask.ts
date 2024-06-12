import axios, { AxiosError } from "axios";

import useAuth from "./useAuth";
import {
  categoriesTask,
  create,
  deleteTask as deleteTaskService,
  task,
  tasks,
  typesTask,
  update,
} from "../services/task.services";
import { PageQueryParams, PageResult } from "../types/PagedResult";
import { Task, TaskCategory, TaskFormParams, TaskType } from "../types/Task";
import { convertHoursToMs, convertMsToTimeString } from "../utils/dateUtils";
import { Status } from "../types/Project";

const useTask = () => {
  const { token, getAuthenticatedHeaders } = useAuth();

  const formatTasks = (items: Task[]): Task[] => {
    return items.map((i: Task) => ({
      ...i,
      timeSpent: convertMsToTimeString(i.timeSpent as unknown as number),
      statusName: Status[i.status],
      categoryName: i?.category?.name,
      typeName: i?.type?.name,
    }));
  };

  const formatTaskForm = (form: TaskFormParams): TaskFormParams => ({
    ...form,
    timeSpent: convertHoursToMs(parseInt(form.timeSpent)),
  });

  const getProjectTasks = async (
    projectId: string,
    params?: PageQueryParams
  ): Promise<PageResult<Task> | undefined> => {
    try {
      const response = await tasks(
        projectId,
        getAuthenticatedHeaders(token),
        params
      );
      if (!axios.isAxiosError(response) && response.data) {
        return {
          ...response.data,
          items: formatTasks(response.data.items),
        };
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const getTaskDetails = async (id: string): Promise<Task | undefined> => {
    try {
      const response = await task(id, getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.data) {
        return response.data;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const getTaskCategories = async (): Promise<TaskCategory[] | undefined> => {
    try {
      const response = await categoriesTask(getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.data) {
        return response.data;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const getTaskTypes = async (): Promise<TaskType[] | undefined> => {
    try {
      const response = await typesTask(getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.data) {
        return response.data;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const updateTask = async (
    id: string,
    payload: TaskFormParams
  ): Promise<boolean | undefined> => {
    try {
      const response = await update(
        id,
        formatTaskForm(payload),
        getAuthenticatedHeaders(token)
      );
      if (!axios.isAxiosError(response) && response.status === 200) {
        return true;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const createTask = async (
    payload: TaskFormParams
  ): Promise<boolean | undefined> => {
    try {
      const response = await create(
        formatTaskForm(payload),
        getAuthenticatedHeaders(token)
      );
      if (!axios.isAxiosError(response) && response.status === 200) {
        return true;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const deleteTask = async (id: string): Promise<boolean | undefined> => {
    try {
      const response = await deleteTaskService(
        id,
        getAuthenticatedHeaders(token)
      );
      if (!axios.isAxiosError(response) && response.status === 204) {
        return true;
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  return {
    getProjectTasks,
    getTaskDetails,
    getTaskCategories,
    getTaskTypes,
    updateTask,
    createTask,
    deleteTask,
  };
};

export default useTask;
