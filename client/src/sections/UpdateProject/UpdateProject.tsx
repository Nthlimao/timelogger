import React, { useEffect, useMemo, useState } from "react";

import Form from "../../components/Form";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import useForm from "../../shared/hooks/useForm";
import useProject from "../../shared/hooks/useProject";

import { Customer } from "../../shared/types/User";
import { FormItem, InputValidations } from "../../shared/types/Form";
import { formatToOptions } from "../../shared/utils/formUtils";
import {
  Project,
  ProjectFormParams,
  statusOptions,
} from "../../shared/types/Project";

import UpdateProjectStyles, {
  UpdateProjectForm,
  UpdateProjectFormFooter,
} from "./UpdateProject.styles";

interface IUpdateProject {
  selected: Project;
  isUpdateProjectOpen: boolean;
  setUpdateProjectOpen: (state: boolean) => void;
  reloadProjects: () => void;
}

const UpdateProject = ({
  selected,
  isUpdateProjectOpen,
  setUpdateProjectOpen,
  reloadProjects,
}: IUpdateProject) => {
  const { updateProject, getAvailableCustomers } = useProject();

  const [customers, setCustomers] = useState<Customer[]>([]);

  const initialForm = useMemo(
    () => ({
      name: selected.name,
      customerId: selected.customerId.toString(),
      status: selected.status.toString(),
      deadline: new Date(selected.deadline as string).toLocaleDateString(
        "pt-PT"
      ),
    }),
    [selected]
  );

  const validationsForm: InputValidations = {
    name: { required: true, minLength: 2 },
    deadline: { required: true, pattern: "date" },
    customerId: { required: true },
    status: { required: true },
  };

  const { values, errors, isValid, handleChange, validateField, resetForm } =
    useForm(initialForm, validationsForm);

  const fetchProjectOptions = async () => {
    const dataCustomers = await getAvailableCustomers();
    if (dataCustomers) setCustomers(dataCustomers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid(true)) {
      const response = await updateProject(
        selected.id.toString(),
        values as ProjectFormParams
      );
      if (response) {
        setUpdateProjectOpen(false);
        resetForm();
        await reloadProjects();
      }
    }
  };

  const handleBlur = (id: string, value: string) => {
    validateField(id, value);
  };

  useEffect(() => {
    fetchProjectOptions();
  }, []);

  const inputs: FormItem[] = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      inputType: "input",
    },
    {
      id: "deadline",
      name: "deadline",
      label: "Deadline",
      type: "text",
      inputType: "input",
    },
    {
      id: "customerId",
      name: "customerId",
      label: "Customer",
      inputType: "select",
      options: formatToOptions(customers),
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
    <UpdateProjectStyles>
      <Modal
        isOpen={isUpdateProjectOpen}
        onClose={() => setUpdateProjectOpen(false)}
        hideFooter
      >
        <UpdateProjectForm onSubmit={handleSubmit}>
          <h2>Update Project</h2>
          <Form
            values={values}
            errors={errors}
            inputs={inputs}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <UpdateProjectFormFooter>
            <Button type="button" onClick={() => setUpdateProjectOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isDisabled={!isValid()}>
              Save
            </Button>
          </UpdateProjectFormFooter>
        </UpdateProjectForm>
      </Modal>
    </UpdateProjectStyles>
  );
};

export default UpdateProject;
