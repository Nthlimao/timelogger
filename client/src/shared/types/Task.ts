import { Status } from "./Project";

export type TaskCategory = {
  id: number;
  name: string;
};

export type TaskType = {
  id: string;
  name: string;
  icon?: string;
};

export type TaskData = { categoryName?: string; typeName?: string };

export type Task = {
  id: number;
  title: string;
  timeSpent: string;
  projectId: number;
  userId: number;
  status: Status;
  statusName?: string;
  category?: TaskCategory;
  type?: TaskType;
} & TaskData;

export type TaskFormParams = {
  status: string;
  taskCategoryId?: string;
  taskTypeId?: string;
  timeSpent: string;
  title: string;
};
