import Button from "../../../components/Button";
import { Status } from "../../../shared/types/Project";
import { Task } from "@/shared/types/Task";

import { convertMsToTimeString } from "../../../shared/utils/dateUtils";

import ViewTaskDetails from "./ViewTask.styles";

interface IViewTask {
  details: Task;
  handleViewMode: () => void;
}

const ViewTask = ({ details, handleViewMode }: IViewTask) => {
  return (
    <ViewTaskDetails>
      <h2>{details.title}</h2>
      <p>
        <b>Status:</b> {Status[details.status]}
      </p>
      <p>
        <b>Time Spent:</b>{" "}
        {convertMsToTimeString(details.timeSpent as unknown as number)}
      </p>
      <p>
        <b>Category: </b>
        {details.category?.name}
      </p>
      <p>
        <b>Task Type: </b>
        {details.type?.name}
      </p>
      <Button onClick={handleViewMode}>Edit</Button>
    </ViewTaskDetails>
  );
};

export default ViewTask;
