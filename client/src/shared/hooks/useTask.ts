import axios from "axios";

import useAuth from "./useAuth";
import {
  categoriesTask,
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
      alert(`Error: ${err}`);
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
      alert(`Error: ${err}`);
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
      alert(`Error: ${err}`);
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
      alert(`Error: ${err}`);
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
      alert(`Error: ${err}`);
    }
  };

  return {
    getProjectTasks,
    getTaskDetails,
    getTaskCategories,
    getTaskTypes,
    updateTask,
  };
};

export default useTask;
