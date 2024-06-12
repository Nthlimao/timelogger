import { useEffect, useState } from "react";

import Form from "../../components/Form";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import useTask from "../../shared/hooks/useTask";
import useForm from "../../shared/hooks/useForm";

import { FormItem, InputValidations } from "@/shared/types/Form";
import { TaskCategory, TaskFormParams, TaskType } from "@/shared/types/Task";
import { formatToOptions } from "../../shared/utils/formUtils";
import { statusOptions } from "../../shared/types/Project";

import CreateTaskStyles, {
  TaskCreateForm,
  TaskCreateFormFooter,
} from "./CreateTask.styles";

interface ICreateTask {
  projectId?: string;
  isCreateTaskOpen: boolean;
  setCreateTaskOpen: (state: boolean) => void;
  reloadTasks: () => void;
}

const CreateTask = ({
  projectId,
  isCreateTaskOpen,
  setCreateTaskOpen,
  reloadTasks,
}: ICreateTask) => {
  const { getTaskCategories, getTaskTypes, createTask } = useTask();

  const [types, setTypes] = useState<TaskType[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);

  const initialForm = {
    title: "",
    taskCategoryId: "",
    taskTypeId: "",
    timeSpent: "",
    status: "",
  };

  const validationsForm: InputValidations = {
    title: { required: true, minLength: 2 },
    timeSpent: { required: true },
    taskCategoryId: { required: true },
    taskTypeId: { required: true },
    status: { required: true },
  };

  const { values, errors, isValid, handleChange, validateField, resetForm } =
    useForm(initialForm, validationsForm);

  const fetchTaskOptions = async () => {
    const dataCategories = await getTaskCategories();
    if (dataCategories) setCategories(dataCategories);

    const dataTypes = await getTaskTypes();
    if (dataTypes) setTypes(dataTypes);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid(true)) {
      const response = await createTask({
        ...values,
        projectId,
      } as TaskFormParams);
      if (response) {
        setCreateTaskOpen(false);
        resetForm();
        await reloadTasks();
      }
    }
  };

  const handleBlur = (id: string, value: string) => {
    validateField(id, value);
  };

  useEffect(() => {
    fetchTaskOptions();
  }, []);

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
      options: formatToOptions(categories),
    },
    {
      id: "taskTypeId",
      name: "taskTypeId",
      label: "Task Type",
      inputType: "select",
      options: formatToOptions(types),
    },
    {
      id: "status",
      name: "status",
      label: "Status",
      inputType: "select",
      options: statusOptions,
    },
  ];

  return (
    <CreateTaskStyles>
      <Modal
        isOpen={isCreateTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        hideFooter
      >
        <TaskCreateForm onSubmit={handleSubmit}>
          <h2>Create New Task</h2>
          <Form
            values={values}
            errors={errors}
            inputs={inputs}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <TaskCreateFormFooter>
            <Button type="button" onClick={() => setCreateTaskOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isDisabled={!isValid()}>
              Save
            </Button>
          </TaskCreateFormFooter>
        </TaskCreateForm>
      </Modal>
    </CreateTaskStyles>
  );
};

export default CreateTask;
