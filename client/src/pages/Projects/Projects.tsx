import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";

import Button from "../../components/Button";
import Table from "../../components/Table";
import CreateProject from "../../sections/CreateProject";

import useProject from "../../shared/hooks/useProject";

import { Data } from "@/components/Table/Table.types";
import { ProjectDTO } from "@/shared/types/Project";
import { PageQueryParams, PageResult } from "@/shared/types/PagedResult";
import ProjectsStyles, { ProjectsPageHeader } from "./Projects.styles";
import useAuth from "../../shared/hooks/useAuth";
import { Role } from "../../shared/types/User";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCreateProjectOpen, setCreateProjectOpen] = useState<boolean>(false);
  const [pagedProjects, setPagedProjects] = useState<PageResult<ProjectDTO>>();
  const [pageQueryParams, setPageQueryParams] = useState<PageQueryParams>();

  const { getProjects } = useProject();

  const fetchProjects = async (params?: PageQueryParams) => {
    const projects = await getProjects(params);
    if (projects) setPagedProjects(projects);
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

  const handleNextPage = (item: Data) => {
    navigate(`/projects/${item.id}`);
  };

  useEffect(() => {
    if (pagedProjects) fetchProjects(pageQueryParams);
  }, [pageQueryParams]);

  useEffect(() => {
    if (!pagedProjects) fetchProjects();
  }, []);

  return (
    <ProjectsStyles className="container">
      <CreateProject
        isCreateProjectOpen={isCreateProjectOpen}
        setCreateProjectOpen={setCreateProjectOpen}
        reloadProjects={fetchProjects}
      />
      <ProjectsPageHeader>
        <div>
          <h2>Projects</h2>
          <p>A list of all the user's projects</p>
        </div>
        {user?.role == Role.Freelancer && (
          <Button onClick={() => setCreateProjectOpen(true)}>
            <PlusIcon width={18} height={18} /> New Project
          </Button>
        )}
      </ProjectsPageHeader>
      <>
        {pagedProjects && (
          <Table
            columns={pagedProjects.columns}
            data={pagedProjects.items}
            handleSort={handleChangeSort}
            handlePagination={handleChangePage}
            handleItemPage={handleNextPage}
            pagination={{
              totalItems: pagedProjects.totalItems,
              totalPages: pagedProjects.totalPages,
              pageNumber: pagedProjects.pageNumber,
              pageSize: pagedProjects.pageSize,
            }}
          />
        )}
      </>
    </ProjectsStyles>
  );
};

export default ProjectsPage;
