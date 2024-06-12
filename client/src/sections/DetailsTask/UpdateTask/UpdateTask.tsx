import { useMemo } from "react";
import { FormItem, InputValidations, InputValues } from "@/shared/types/Form";
import { Task, TaskCategory, TaskType } from "@/shared/types/Task";

import Button from "../../../components/Button";
import Form from "../../../components/Form";

import useForm from "../../../shared/hooks/useForm";
import { statusOptions } from "../../../shared/types/Project";
import { convertMsToMinutes } from "../../../shared/utils/dateUtils";
import { formatToOptions } from "../../../shared/utils/formUtils";
import TaskUpdateForm, { TaskUpdateFormFooter } from "./UpdateTask.styles";

interface IUpdateTask {
  selected: Task;
  categoryOptions: TaskCategory[];
  typeOptions: TaskType[];
  handleViewMode: () => void;
  handleSubmit: (values: InputValues) => Promise<void>;
}

const UpdateTask = ({
  selected,
  typeOptions,
  categoryOptions,
  handleViewMode,
  handleSubmit,
}: IUpdateTask) => {
  const initialForm = useMemo(
    () => ({
      title: selected.title ?? "",
      taskCategoryId: selected.category?.id.toString() ?? "",
      taskTypeId: selected.type?.id.toString() ?? "",
      timeSpent: convertMsToMinutes(parseInt(selected.timeSpent)) ?? "",
      status: selected.status.toString(),
    }),
    [selected]
  );

  const validationsForm: InputValidations = {
    title: { required: true, minLength: 2 },
    timeSpent: { required: true },
    taskCategoryId: { required: true },
    taskTypeId: { required: true },
    status: { required: true },
  };

  const { values, errors, isValid, handleChange, validateField, resetForm } =
    useForm(initialForm, validationsForm);

  const handleBlur = (id: string, value: string) => {
    validateField(id, value);
  };

  const inputs: FormItem[] = [
    {
      id: "title",
      name: "title",
      label: "Title",
      type: "text",
      inputType: "input",
    },
    {
      id: "timeSpent",
      name: "timeSpent",
      label: "Time Spent (Mins)",
      type: "number",
      inputType: "input",
    },
    {
      id: "taskCategoryId",
      name: "taskCategoryId",
      label: "Task Category",
      inputType: "select",
      options: formatToOptions(categoryOptions),
    },
    {
      id: "taskTypeId",
      name: "taskTypeId",
      label: "Task Type",
      inputType: "select",
      options: formatToOptions(typeOptions),
    },
    {
      id: "status",
      name: "status",
      label: "Status",
      inputType: "select",
      options: statusOptions,
    },
  ];

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid(true)) {
      handleSubmit(values);
      resetForm();
    }
  };

  return (
    <TaskUpdateForm onSubmit={onSubmit}>
      <h2>Update Task</h2>
      <Form
        values={values}
        errors={errors}
        inputs={inputs}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <TaskUpdateFormFooter>
        <Button type="button" onClick={handleViewMode}>
          Cancel
        </Button>
        <Button type="submit" isDisabled={!isValid()}>
          Save
        </Button>
      </TaskUpdateFormFooter>
    </TaskUpdateForm>
  );
};
export default UpdateTask;
