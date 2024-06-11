import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";

import Button from "../../components/Button";
import Table from "../../components/Table";
import { Data } from "@/components/Table/Table.types";
import CreateTask from "../../sections/CreateTask";
import DetailsTask from "../../sections/DetailsTask";

import useProject from "../../shared/hooks/useProject";
import useTask from "../../shared/hooks/useTask";

import { ProjectDTO } from "@/shared/types/Project";
import { Task } from "@/shared/types/Task";
import { PageQueryParams, PageResult } from "@/shared/types/PagedResult";

import ProjectStyles, { ProjectPageHeader } from "./Project.styles";

const ProjectPage = () => {
  const { id } = useParams();
  const { getProjectDetails } = useProject();
  const { getProjectTasks, getTaskDetails } = useTask();

  const [selectedTask, setSelectedTask] = useState<Task>();

  const [isCreateTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [pageQueryParams, setPageQueryParams] = useState<PageQueryParams>();
  const [project, setProject] = useState<ProjectDTO>();
  const [tasks, setTasks] = useState<PageResult<Task>>();

  const fetchProject = async () => {
    if (id) {
      const data = await getProjectDetails(id);
      if (data) setProject(data);
    }
  };

  const fetchTasks = async (params?: PageQueryParams) => {
    if (id) {
      const data = await getProjectTasks(id, params);
      if (data) setTasks(data);
    }
  };

  const handleChangePage = (page: number) => {
    setPageQueryParams((prev) => ({ ...prev, page }));
  };

  const handleChangeSort = (
    sortDirection: PageQueryParams["sortDirection"],
    sortBy: PageQueryParams["sortBy"]
  ) => {
    setPageQueryParams((prev) => ({
      ...prev,
      sortDirection,
      sortBy,
    }));
  };

  const handleSelectTask = async (item: Data) => {
    if (item?.id) {
      const details = await getTaskDetails(item.id);
      if (details) setSelectedTask(details);
    }
  };

  useEffect(() => {
    if (!project) fetchProject();
    if (!tasks) fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks) fetchTasks(pageQueryParams);
  }, [pageQueryParams]);

  return (
    <ProjectStyles className="container">
      {selectedTask && (
        <DetailsTask selectedTask={selectedTask} reloadTasks={fetchTasks} />
      )}
      <CreateTask
        projectId={id?.toString()}
        isCreateTaskOpen={isCreateTaskOpen}
        setCreateTaskOpen={setCreateTaskOpen}
        reloadTasks={fetchTasks}
      />
      <ProjectPageHeader>
        <h2>{project?.name}</h2>
      </ProjectPageHeader>
      <ProjectPageHeader>
        <div>
          <h3>Tasks</h3>
          <p>A list of all the task's projects</p>
        </div>
        <Button onClick={() => setCreateTaskOpen(true)}>
          <PlusIcon width={18} height={18} /> New Task
        </Button>
      </ProjectPageHeader>
      {tasks && (
        <Table
          columns={tasks.columns}
          data={tasks.items}
          handleSort={handleChangeSort}
          handlePagination={handleChangePage}
          handleItemPage={handleSelectTask}
          pagination={{
            totalItems: tasks.totalItems,
            totalPages: tasks.totalPages,
            pageNumber: tasks.pageNumber,
            pageSize: tasks.pageSize,
          }}
        />
      )}
    </ProjectStyles>
  );
};

export default ProjectPage;
