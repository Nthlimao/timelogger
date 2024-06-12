import { TaskCategory, TaskType } from "../types/Task";
import { Customer, User } from "../types/User";

export const formatToOptions = (
  items: TaskCategory[] | TaskType[] | Customer[]
) => {
  return items.map((i) => ({
    label: i.name,
    value: i.id.toString(),
  }));
};
