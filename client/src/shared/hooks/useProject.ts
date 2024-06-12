import axios, { AxiosError } from "axios";

import useAuth from "./useAuth";
import { ProjectDTO, ProjectFormParams } from "@/types/Project";
import { PageQueryParams, PageResult } from "../types/PagedResult";
import { convertMsToTimeString } from "../utils/dateUtils";

import {
  create,
  deleteProject as deleteProjectService,
  project,
  projects,
  update,
} from "../services/project.services";
import { Customer } from "../types/User";
import { getCustomers } from "../services/user.service";

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
        alert(response.statusText);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const getProjectDetails = async (id: string) => {
    try {
      const response = await project(id, getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.data) {
        return response.data;
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const updateProject = async (
    id: string,
    payload: ProjectFormParams
  ): Promise<boolean | undefined> => {
    try {
      const response = await update(
        id,
        payload,
        getAuthenticatedHeaders(token)
      );
      if (!axios.isAxiosError(response) && response.status === 200) {
        return true;
      } else {
        alert(`Error: ${response.data}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const createProject = async (
    payload: ProjectFormParams
  ): Promise<boolean | undefined> => {
    try {
      const response = await create(payload, getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.status === 200) {
        return true;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const getAvailableCustomers = async (): Promise<Customer[] | undefined> => {
    try {
      const response = await getCustomers(getAuthenticatedHeaders(token));
      if (!axios.isAxiosError(response) && response.data) {
        return response.data;
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  const deleteProject = async (id: string): Promise<boolean | undefined> => {
    try {
      const response = await deleteProjectService(
        id,
        getAuthenticatedHeaders(token)
      );
      if (!axios.isAxiosError(response) && response.status === 204) {
        return true;
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      const error = err as AxiosError;
      alert(`Error: ${error.response?.data}`);
    }
  };

  return {
    getProjects,
    getProjectDetails,
    createProject,
    updateProject,
    getAvailableCustomers,
    deleteProject,
  };
};

export default useProject;
