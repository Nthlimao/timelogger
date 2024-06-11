import { ReactNode, useEffect, useMemo, useState } from "react";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputForm from "../../components/InputForm";
import SelectForm from "../../components/SelectForm";

import { Status, statusOptions } from "../../shared/types/Project";
import useTask from "../../shared/hooks/useTask";
import useForm, { InputValidations } from "../../shared/hooks/useForm";
import {
  Task,
  TaskCategory,
  TaskFormParams,
  TaskType,
} from "@/shared/types/Task";
import { AuthPayload } from "@/shared/types/Auth";

import {
  convertMsToHours,
  convertMsToTimeString,
} from "../../shared/utils/dateUtils";

import TaskDetailsStyles, {
  TaskDetailsForm,
  TaskDetailsFormFooter,
  TaskDetailsInner,
} from "./TaskDetails.styles";

interface ITaskDetails {
  selectedTask: Task;
  reloadTasks: () => {};
}

const TaskDetails = ({ selectedTask, reloadTasks }: ITaskDetails) => {
  const { getTaskCategories, getTaskTypes, updateTask } = useTask();

  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [types, setTypes] = useState<TaskType[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);

  const initialForm = useMemo(
    () => ({
      title: selectedTask.title ?? "",
      taskCategoryId: selectedTask.category?.id.toString() ?? "",
      taskTypeId: selectedTask.type?.id.toString() ?? "",
      timeSpent:
        convertMsToHours(selectedTask.timeSpent as unknown as number) ?? "",
      status: selectedTask.status.toString(),
    }),
    [selectedTask]
  );

  const validationsForm: InputValidations = {
    title: { required: true, minLength: 2 },
    timeSpent: { required: true },
    taskCategoryId: { required: true },
    taskTypeId: { required: true },
    status: { required: true },
  };

  const { values, errors, isValid, handleChange, validateField } = useForm(
    initialForm,
    validationsForm
  );

  const fetchTaskOptions = async (task: Task) => {
    const dataCategories = await getTaskCategories();
    if (dataCategories) setCategories(dataCategories);

    const dataTypes = await getTaskTypes();
    if (dataTypes) setTypes(dataTypes);
  };

  const formatToOptions = (items: TaskCategory[] | TaskType[]) => {
    return items.map((i) => ({
      label: i.name,
      value: i.id.toString(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid(true)) {
      const response = await updateTask(
        selectedTask.id.toString(),
        values as TaskFormParams
      );
      if (response) {
        setTaskModalOpen(false);
        setEditMode(false);
        await reloadTasks();
      }
    } else {
      alert("Formulário inválido");
    }
  };

  useEffect(() => {
    if (selectedTask) setTaskModalOpen(true);
  }, [selectedTask]);

  useEffect(() => {
    if (isEditMode && selectedTask) fetchTaskOptions(selectedTask);
  }, [isEditMode]);

  const renderView = (task: Task): ReactNode => (
    <TaskDetailsInner>
      <h2>{task.title}</h2>
      <p>
        <b>Status:</b> {Status[task.status]}
      </p>
      <p>
        <b>Time Spent:</b>{" "}
        {convertMsToTimeString(task.timeSpent as unknown as number)}
      </p>
      <p>
        <b>Category: </b>
        {task.category?.name}
      </p>
      <p>
        <b>Task Type: </b>
        {task.type?.name}
      </p>
      <Button onClick={() => setEditMode(true)}>Edit</Button>
    </TaskDetailsInner>
  );

  const renderForm = (task: Task) => (
    <TaskDetailsForm onSubmit={handleSubmit}>
      <h2>Update Task</h2>
      <InputForm
        id="title"
        name="title"
        type="text"
        label="Title"
        value={values.title}
        error={errors.title}
        handleChange={handleChange}
        handleBlur={() => validateField("title", values.title)}
      />
      <InputForm
        id="timeSpent"
        name="timeSpent"
        type="number"
        label="Time Spent"
        value={values.timeSpent}
        error={errors.timeSpent}
        handleChange={handleChange}
        handleBlur={() => validateField("timeSpent", values.timeSpent)}
      />
      <SelectForm
        id="taskCategoryId"
        name="taskCategoryId"
        label="Task Category"
        value={values.taskCategoryId}
        error={errors.taskCategoryId}
        handleChange={handleChange}
        options={formatToOptions(categories)}
      />
      <SelectForm
        id="taskTypeId"
        name="taskTypeId"
        label="Task Type"
        value={values.taskTypeId}
        error={errors.taskTypeId}
        handleChange={handleChange}
        options={formatToOptions(types)}
      />
      <SelectForm
        id="status"
        name="status"
        label="Status"
        value={values.status}
        error={errors.status}
        handleChange={handleChange}
        options={statusOptions}
      />
      <TaskDetailsFormFooter>
        <Button type="button" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </TaskDetailsFormFooter>
    </TaskDetailsForm>
  );

  return (
    <TaskDetailsStyles>
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        hideFooter={isEditMode}
      >
        {selectedTask && !isEditMode && renderView(selectedTask)}
        {selectedTask && isEditMode && renderForm(selectedTask)}
      </Modal>
    </TaskDetailsStyles>
  );
};

export default TaskDetails;
