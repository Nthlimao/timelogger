import { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import useTask from "../../shared/hooks/useTask";

import { InputValues } from "@/shared/types/Form";
import {
  Task,
  TaskCategory,
  TaskFormParams,
  TaskType,
} from "@/shared/types/Task";

import ViewTask from "./ViewTask/ViewTask";
import UpdateTask from "./UpdateTask/UpdateTask";
import DetailsTaskStyles from "./DetailsTask.styles";

interface ITaskDetails {
  selectedTask: Task;
  reloadTasks: () => {};
}

const DetailsTask = ({ selectedTask, reloadTasks }: ITaskDetails) => {
  const { getTaskCategories, getTaskTypes, updateTask, deleteTask } = useTask();

  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [types, setTypes] = useState<TaskType[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);

  const fetchTaskOptions = async () => {
    const dataCategories = await getTaskCategories();
    if (dataCategories) setCategories(dataCategories);

    const dataTypes = await getTaskTypes();
    if (dataTypes) setTypes(dataTypes);
  };

  const handleSubmit = async (values: InputValues) => {
    const response = await updateTask(
      selectedTask.id.toString(),
      values as TaskFormParams
    );

    if (response) {
      setTaskModalOpen(false);
      setEditMode(false);
      await reloadTasks();
    }
  };

  const handleDelete = async () => {
    const response = await deleteTask(selectedTask.id.toString());

    if (response) {
      setTaskModalOpen(false);
      setEditMode(false);
      await reloadTasks();
    }
  };

  useEffect(() => {
    if (selectedTask) setTaskModalOpen(true);
  }, [selectedTask]);

  useEffect(() => {
    if (isEditMode && selectedTask) fetchTaskOptions();
  }, [isEditMode]);

  return (
    <DetailsTaskStyles>
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        hideFooter={isEditMode}
      >
        {selectedTask && !isEditMode && (
          <ViewTask
            details={selectedTask}
            handleDelete={handleDelete}
            handleViewMode={() => setEditMode(true)}
          />
        )}

        {selectedTask && isEditMode && (
          <UpdateTask
            selected={selectedTask}
            categoryOptions={categories}
            typeOptions={types}
            handleViewMode={() => setEditMode(false)}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
    </DetailsTaskStyles>
  );
};

export default DetailsTask;
