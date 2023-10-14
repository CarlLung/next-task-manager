import { TaskCard } from "./TaskCard";
import { Task } from "../../interface/task";

interface TaskListProps {
  allTasks: Task[];
  filteredTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
  selectedTask: Task | null;
  handleSelectedTask: (task: Task | null) => void;
  selectedTab: string;
  setAddModalShow: (boolean: boolean) => void;
  setUpdateModalShow: (boolean: boolean) => void;
  setDetailsModalShow: (boolean: boolean) => void;
  setGuideModalShow: (boolean: boolean) => void;
  isDue: (task: Task) => boolean;
}

export const TasksListDisplay = ({
  allTasks,
  filteredTasks,
  handleAllTasks,
  selectedTask,
  handleSelectedTask,
  selectedTab,
  setAddModalShow,
  setUpdateModalShow,
  setDetailsModalShow,
  setGuideModalShow,
  isDue,
}: TaskListProps) => {
  return (
    <>
      <div className="h-fit flex flex-row">
        <div className="items-center mx-auto mt-1 text-2xl text-gray-400 font-bold flex">
          <h1 className="">{selectedTab}</h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className="w-5 h-5 flex items-center ml-2 rounded stroke-slate-400 cursor-help hover:stroke-rose-500"
            style={{ marginTop: "0.1rem" }}
            onClick={() => {
              setGuideModalShow(true);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10 hover:fill-rose-500 cursor-pointer flex items-center mr-6 rounded fill-red-600 justify-end"
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <ul className="mt-2 h-full overflow-y-scroll">
        {filteredTasks.map((currentTask: Task) => (
          <TaskCard
            key={currentTask._id}
            currentTask={currentTask}
            allTasks={allTasks}
            selectedTask={selectedTask}
            handleSelectedTask={handleSelectedTask}
            handleAllTasks={handleAllTasks}
            setUpdateModalShow={setUpdateModalShow}
            setDetailsModalShow={setDetailsModalShow}
            isDue={isDue}
          />
        ))}
      </ul>
    </>
  );
};
