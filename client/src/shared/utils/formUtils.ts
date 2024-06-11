import { TaskCategory, TaskType } from "../types/Task";

export const formatToOptions = (items: TaskCategory[] | TaskType[]) => {
  return items.map((i) => ({
    label: i.name,
    value: i.id.toString(),
  }));
};
