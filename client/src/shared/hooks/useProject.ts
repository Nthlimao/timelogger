import axios from "axios";

import useAuth from "./useAuth";
import { ProjectDTO } from "@/types/Project";
import { projects } from "../services/project.services";
import { PageQueryParams, PageResult } from "../types/PagedResult";
import { convertMsToTimeString } from "../utils/dateUtils";

const useProject = () => {
  const { token, getAuthenticatedHeaders } = useAuth();

  const formartProjects = (items: ProjectDTO[]): ProjectDTO[] => {
    return items.map((i: ProjectDTO) => ({
      ...i,
      deadline: new Date(i.deadline as string).toLocaleDateString("pt-PT"),
      totalTimeSpent: convertMsToTimeString(i.totalTimeSpent as number),
    }));
  };

  const getProjects = async (
    params?: PageQueryParams
  ): Promise<PageResult<ProjectDTO> | undefined> => {
    try {
      const response = await projects(getAuthenticatedHeaders(token), params);
      if (!axios.isAxiosError(response) && response.data) {
        return {
          ...response.data,
          items: formartProjects(response.data.items),
        };
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getProjects,
  };
};

export default useProject;
