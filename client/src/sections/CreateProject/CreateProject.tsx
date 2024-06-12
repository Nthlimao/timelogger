import { useEffect, useState } from "react";

import Form from "../../components/Form";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import useForm from "../../shared/hooks/useForm";
import useProject from "../../shared/hooks/useProject";

import { FormItem, InputValidations } from "@/shared/types/Form";
import { formatToOptions } from "../../shared/utils/formUtils";
import { ProjectFormParams, statusOptions } from "../../shared/types/Project";

import CreateProjectStyles, {
  CreateProjectForm,
  CreateProjectFormFooter,
} from "./CreateProject.styles";
import { Customer } from "@/shared/types/User";

interface ICreateProject {
  isCreateProjectOpen: boolean;
  setCreateProjectOpen: (state: boolean) => void;
  reloadProjects: () => void;
}

const CreateProject = ({
  isCreateProjectOpen,
  setCreateProjectOpen,
  reloadProjects,
}: ICreateProject) => {
  const { createProject, getAvailableCustomers } = useProject();

  const [customers, setCustomers] = useState<Customer[]>([]);

  const initialForm = {
    name: "",
    deadline: "",
    customerId: "",
    status: "",
  };

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
      const response = await createProject(values as ProjectFormParams);
      if (response) {
        setCreateProjectOpen(false);
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
    <CreateProjectStyles>
      <Modal
        isOpen={isCreateProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        hideFooter
      >
        <CreateProjectForm onSubmit={handleSubmit}>
          <h2>Create New Project</h2>
          <Form
            values={values}
            errors={errors}
            inputs={inputs}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <CreateProjectFormFooter>
            <Button type="button" onClick={() => setCreateProjectOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isDisabled={!isValid()}>
              Save
            </Button>
          </CreateProjectFormFooter>
        </CreateProjectForm>
      </Modal>
    </CreateProjectStyles>
  );
};

export default CreateProject;
