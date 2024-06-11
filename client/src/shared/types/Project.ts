import { Task } from "./Task";

export enum Status {
  Backlog = 0,
  ToDo = 1,
  InProgress = 2,
  InReview = 3,
  Done = 4,
  Canceled = 5,
}

export type Project = {
  id: number;
  name: string;
  deadline?: string | Date;
  customerId: number;
  customer: string;
  status: Status;
};

export type ProjectDTO = Project & {
  totalTimeSpent: number | string;
  tasks?: Task[];
};
