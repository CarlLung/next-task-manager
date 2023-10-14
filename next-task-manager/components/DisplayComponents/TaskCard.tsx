import { DeleteTask } from "../CrudComponents/DeleteTask";
import { CompleteTask } from "../CrudComponents/CompleteTask";
import { UpdateButton } from "../ButtonComponents/UpdateButton";
import { formatCardDate } from "@/functions/formatDate";
import { Task } from "../../interface/task";
import { CalendarIcon } from "@/static/CalendarIcon";
import { RecurringIcon } from "@/static/RecurringIcon";

interface TaskCardsProps {
  currentTask: Task;
  allTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
  selectedTask: Task | null;
  handleSelectedTask: (task: Task | null) => void;
  setUpdateModalShow: (boolean: boolean) => void;
  setDetailsModalShow: (boolean: boolean) => void;
  isDue: (task: Task) => boolean;
}

export const TaskCard = ({
  currentTask,
  allTasks,
  handleAllTasks,
  handleSelectedTask,
  setUpdateModalShow,
  setDetailsModalShow,
  isDue,
}: TaskCardsProps) => {
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleSelectedTask(currentTask);
    setUpdateModalShow(true);
  };
  const handleDetails = () => {
    handleSelectedTask(currentTask);
    setDetailsModalShow(true);
  };
  let fill;
  switch (currentTask!.priority) {
    case "1st":
      fill = "bg-red-600";
      break;
    case "2nd":
      fill = "bg-yellow-600";
      break;
    case "3rd":
      fill = "bg-blue-600";
      break;
    case "4th":
      fill = "bg-gray-200";
      break;
  }
  const isTaskDue = isDue(currentTask);
  const textColorClass =
    isTaskDue && currentTask.routine === "nil"
      ? "text-red-600"
      : "text-gray-400";
  const fillClass =
    isTaskDue && currentTask.routine === "nil"
      ? "fill-red-600"
      : currentTask.routine === "nil"
      ? "fill-gray-400"
      : "fill-green-600";

  return (
    <li
      onClick={handleDetails}
      className="bg-stone-900 shadow-lg cursor-pointer rounded-md mt-1 overflow-hidden flex flex-row"
    >
      <div className={`${fill} w-2.5`}></div>
      <div className="flex flex-row p-4 w-full">
        <CompleteTask
          _id={currentTask._id}
          allTasks={allTasks}
          handleAllTasks={handleAllTasks}
        />
        <div className="w-full flex flex-row">
          <span className="text-md text-gray-400 font-medium">
            {currentTask.content}
          </span>
          <a
            className={`text-sm self-center ${fillClass} px-2 ml-2 rounded justify-start`}
          >
            {currentTask.routine === "nil" ? (
              <CalendarIcon />
            ) : (
              <RecurringIcon />
            )}
          </a>
          <span className={`text-sm self-center ${textColorClass} font-medium`}>
            {formatCardDate(
              new Date(currentTask.assignedTime),
              currentTask.routine
            )}
          </span>
        </div>

        <div className="flex flex-row items-center justify-end">
          <DeleteTask
            _id={currentTask._id}
            allTasks={allTasks}
            handleAllTasks={handleAllTasks}
          />
          <UpdateButton handleEdit={handleEdit} />
        </div>
      </div>
    </li>
  );
};
