import { Status } from "./Project";

export type TaskCategory = {
  id: number;
  name: string;
};

export type TaskType = {
  id: number;
  name: string;
  icon?: string;
};

export type Task = {
  id: number;
  title: string;
  timeSpent: number;
  projectId: number;
  userId: number;
  taskTypeId?: number;
  taskCategoryId?: number;
  status: Status;
};
