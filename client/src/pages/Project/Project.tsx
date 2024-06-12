import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

import Button from "../../components/Button";
import Table from "../../components/Table";
import { Data } from "@/components/Table/Table.types";
import CreateTask from "../../sections/CreateTask";
import DetailsTask from "../../sections/DetailsTask";
import UpdateProject from "../../sections/UpdateProject";

import useProject from "../../shared/hooks/useProject";
import useTask from "../../shared/hooks/useTask";

import { convertMsToTimeString } from "../../shared/utils/dateUtils";
import { ProjectDTO, Status } from "../../shared/types/Project";
import { Task } from "@/shared/types/Task";
import { PageQueryParams, PageResult } from "../../shared/types/PagedResult";

import ProjectStyles, {
  ProjectDetails,
  ProjectDetailsHeader,
  ProjectPageHeader,
} from "./Project.styles";
import useAuth from "../../shared/hooks/useAuth";
import { Role } from "../../shared/types/User";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectDetails, deleteProject } = useProject();
  const { getProjectTasks, getTaskDetails } = useTask();
  const { user } = useAuth();

  const [selectedTask, setSelectedTask] = useState<Task>();

  const [isUpdateProjectOpen, setUpdateProjectOpen] = useState<boolean>(false);
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

  const handleDelete = async () => {
    if (id) {
      const response = await deleteProject(id);

      if (response) {
        navigate("/projects/");
      }
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

  const getDateString = (d?: string): string | undefined => {
    return d && new Date(d as string).toLocaleDateString("pt-PT");
  };

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
      {project && (
        <UpdateProject
          selected={project}
          isUpdateProjectOpen={isUpdateProjectOpen}
          setUpdateProjectOpen={setUpdateProjectOpen}
          reloadProjects={fetchProject}
        />
      )}
      <ProjectDetailsHeader>
        <div>
          <h2>{project?.name}</h2>
          {project && (
            <ProjectDetails>
              <p>
                <b>Status:</b> {Status[project.status]}
              </p>
              <p>
                <b>Customer:</b> {project.customer}
              </p>
              <p>
                <b>Deadline:</b> {getDateString(project.deadline as string)}
              </p>
              <p>
                <b>Total Time Spent:</b>{" "}
                {convertMsToTimeString(
                  parseInt(project.totalTimeSpent as string)
                )}
              </p>
            </ProjectDetails>
          )}
        </div>
        {user?.role == Role.Freelancer && (
          <div>
            <Button onClick={() => setUpdateProjectOpen(true)}>
              <PencilSquareIcon width={18} height={18} /> Edit Project
            </Button>
            <Button onClick={() => handleDelete()}>
              <TrashIcon width={18} height={18} /> Delete Project
            </Button>
          </div>
        )}
      </ProjectDetailsHeader>
      <ProjectPageHeader>
        <div>
          <h3>Tasks</h3>
          <p>A list of all the task's projects</p>
        </div>
        {user?.role == Role.Freelancer && (
          <Button onClick={() => setCreateTaskOpen(true)}>
            <PlusIcon width={18} height={18} /> New Task
          </Button>
        )}
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
