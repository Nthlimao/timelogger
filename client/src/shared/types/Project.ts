export enum Status {
  Backlog = 0,
  ToDo = 1,
  InProgress = 2,
  InReview = 3,
  Done = 4,
  Canceled = 5,
}

export const statusOptions = [
  { label: "Backlog", value: Status.Backlog.toString() },
  { label: "To Do", value: Status.ToDo.toString() },
  { label: "In Progress", value: Status.InProgress.toString() },
  { label: "In Review", value: Status.InReview.toString() },
  { label: "Done", value: Status.Done.toString() },
  { label: "Canceled", value: Status.Canceled.toString() },
];

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
};

export type ProjectFormParams = {
  name: string;
  customerId: string;
  deadline: string;
  status: string;
};
