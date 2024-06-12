import Button from "../../../components/Button";
import { Status } from "../../../shared/types/Project";
import { Task } from "@/shared/types/Task";

import { convertMsToMinutesString } from "../../../shared/utils/dateUtils";
import useAuth from "../../../shared/hooks/useAuth";
import { Role } from "../../../shared/types/User";

import ViewTaskDetails from "./ViewTask.styles";

interface IViewTask {
  details: Task;
  handleViewMode: () => void;
  handleDelete: () => void;
}

const ViewTask = ({ details, handleViewMode, handleDelete }: IViewTask) => {
  const { user } = useAuth();
  return (
    <ViewTaskDetails>
      <h2>{details.title}</h2>
      <p>
        <b>Status:</b> {Status[details.status]}
      </p>
      <p>
        <b>Time Spent:</b>{" "}
        {convertMsToMinutesString(details.timeSpent as unknown as number)}
      </p>
      <p>
        <b>Category: </b>
        {details.category?.name}
      </p>
      <p>
        <b>Task Type: </b>
        {details.type?.name}
      </p>
      {user?.role == Role.Freelancer && (
        <>
          <Button onClick={handleViewMode}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
      )}
    </ViewTaskDetails>
  );
};

export default ViewTask;
