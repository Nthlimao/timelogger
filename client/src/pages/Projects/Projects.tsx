import { PlusIcon } from "@heroicons/react/16/solid";

import Button from "../../components/Button";
import Table from "../../components/Table";
import useProject from "../../shared/hooks/useProject";

import ProjectsStyles, { ProjectsPageHeader } from "./Projects.styles";
import { useEffect, useState } from "react";
import { ProjectDTO } from "@/shared/types/Project";
import { PageQueryParams, PageResult } from "@/shared/types/PagedResult";

const ProjectsPage = () => {
  const [pagedProjects, setPagedProjects] = useState<PageResult<ProjectDTO>>();
  const [pageQueryParams, setPageQueryParams] = useState<PageQueryParams>();

  const { getProjects } = useProject();

  const fetchProjects = async (params?: PageQueryParams) => {
    const projects = await getProjects(params);
    console.log(projects);
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

  useEffect(() => {
    if (pagedProjects) fetchProjects(pageQueryParams);
  }, [pageQueryParams]);

  useEffect(() => {
    if (!pagedProjects) fetchProjects();
  }, []);

  return (
    <ProjectsStyles className="container">
      <ProjectsPageHeader>
        <div>
          <h2>Projects</h2>
          <p>A list of all the user's projects</p>
        </div>
        <Button>
          <PlusIcon width={18} height={18} /> New Project
        </Button>
      </ProjectsPageHeader>
      <>
        {pagedProjects && (
          <Table
            columns={pagedProjects.columns}
            data={pagedProjects.items}
            handleSort={handleChangeSort}
            handlePagination={handleChangePage}
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
