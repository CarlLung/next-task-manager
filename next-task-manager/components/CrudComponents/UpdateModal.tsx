import { useState, useEffect } from "react";
import { Task } from "../../interface/task";
import { UpdateTaskButton } from "@/static/UpdateTaskButton";

interface UpdateTaskPayload {
  content: string;
  assignedTime: Date;
  priority: string;
  routine: string;
  areaOfFocus: boolean;
  alarm: boolean;
  note: string;
  weekday: number | "nil";
}

interface UpdateTaskProps {
  onClose: () => void;
  allTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

export const UpdateModal = ({
  onClose,
  allTasks,
  handleAllTasks,
  selectedTask,
  setSelectedTask,
}: UpdateTaskProps) => {
  const [frequency, setFrequency] = useState(selectedTask!.routine || "nil");
  const [day, setDay] = useState<number | string>("nil");
  const [isValidForm, setIsValidForm] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<UpdateTaskPayload>({
    content: selectedTask!.content,
    assignedTime: selectedTask!.assignedTime,
    priority: selectedTask!.priority,
    routine: selectedTask!.routine,
    areaOfFocus: selectedTask!.areaOfFocus,
    alarm: selectedTask!.alarm,
    note: selectedTask!.note,
    weekday: selectedTask!.weekday,
  });
  const extractFormData = (
    event: React.FormEvent<HTMLFormElement>
  ): UpdateTaskPayload => {
    const formInstance = new FormData(event.target as HTMLFormElement);
    const weekdayRaw = formInstance.get("weekday");
    const weekdayValue =
      weekdayRaw === "nil" ? "nil" : parseInt(weekdayRaw as string, 10);

    return {
      content: (formInstance.get("content") as string) || "",
      assignedTime: new Date(formInstance.get("assignedTime") as string),
      priority: formInstance.get("priority") as string,
      routine: (formInstance.get("routine") as string) || "nil",
      areaOfFocus: (formInstance.get("areaOfFocus") as string) === "on",
      alarm: (formInstance.get("alarm") as string) === "on",
      note: (formInstance.get("note") as string) || "",
      weekday: weekdayValue,
    };
  };
  const validate = (data: UpdateTaskPayload) => {
    let currentErrors = [];

    if (!data.content.trim()) {
      currentErrors.push("Task name cannot be empty.");
    }
    if (frequency !== "nil" && frequency !== "daily" && day === "nil") {
      currentErrors.push("Please choose a recurring day.");
    }
    if (isNaN(data.assignedTime.getTime())) {
      currentErrors.push("Please choose the date and time.");
    }
    console.log(data.assignedTime);
    return currentErrors;
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputData = extractFormData(event);
    const validationErrors = validate(inputData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    const updatedTask: UpdateTaskPayload = {
      content: inputData.content,
      assignedTime: inputData.assignedTime,
      priority: inputData.priority,
      routine: inputData.routine,
      areaOfFocus: inputData.areaOfFocus,
      alarm: inputData.alarm,
      note: inputData.note,
      weekday: inputData.weekday,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/${selectedTask!._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        const newList = allTasks.map((task: Task) => {
          if (task._id === selectedTask!._id) {
            return { ...task, ...updatedTask };
          }
          return task;
        });
        handleAllTasks(newList);
        onClose();
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      alert("failed");
    }
  };
  useEffect(() => {
    if (!isFormTouched) return;
    const validationErrors = validate(formData);
    console.log(validationErrors);
    setErrors(validationErrors);
    setIsValidForm(validationErrors.length === 0);
  }, [formData]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="w-1/2 h-8/12 bg-white rounded-xl">
        <section>
          <div className="bg-stone-900 rounded-t-xl flex opacity-90">
            <h3 className="text-gray-400 font-semibold p-3 flex items-center fill-red-600">
              <UpdateTaskButton />
              <span>Update Task</span>
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-semibold px-3 py-1 rounded hover:text-red-600 ml-auto mr-7"
            >
              Close
            </button>
          </div>
          <div className="bg-stone-900 text-gray-700 px-5 pb-6 pt-1 rounded-b-xl opacity-90">
            {errors.length > 0 && (
              <div>
                <ul>
                  {errors.map((error, index) => (
                    <li className="text-red-600" key={index}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleUpdateTask} className="flex flex-col">
              <div className="p-5">
                <div className="flex">
                  <input
                    placeholder="Task"
                    name="content"
                    value={selectedTask!.content}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        content: e.target.value,
                      } as Task)
                    }
                    className="w-8/12 h-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-600"
                  />
                  <input
                    placeholder="Time"
                    type="datetime-local"
                    name="assignedTime"
                    value={
                      selectedTask?.assignedTime
                        ? new Date(selectedTask.assignedTime)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const inputDate = new Date(e.target.value + "Z");

                      if (!isNaN(inputDate.getTime())) {
                        setSelectedTask({
                          ...selectedTask,
                          assignedTime: inputDate,
                        } as Task);
                      }
                    }}
                    className="w-4/12 border border-gray-400 rounded-lg p-2 ml-3 bg-gray-400 opacity-40 placeholder-gray-50"
                  />
                </div>
                <select
                  placeholder="Priority"
                  name="priority"
                  value={selectedTask!.priority}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      priority: e.target.value,
                    } as Task)
                  }
                  className="mt-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-50"
                >
                  <option value="1st">1st Priority</option>
                  <option value="2nd">2nd Priority</option>
                  <option value="3rd">3rd Priority</option>
                  <option value="4th">4th Priority</option>
                </select>
                <div className="flex">
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="Routine"
                    name="routine"
                    className="mt-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-50"
                  >
                    <option value="nil">Not a Routine</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <select
                    value={day}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDay(value === "nil" ? value : parseInt(value));
                    }}
                    disabled={frequency === "daily" || frequency === "nil"}
                    placeholder="Recurring Day"
                    name="weekday"
                    defaultValue="nil"
                    className="mt-3 ml-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-50"
                  >
                    <option value="nil">Select a Day (if Routine)</option>
                    {frequency === "weekly" &&
                      daysOfWeek.map((day, index) => (
                        <option key={day} value={index}>
                          {day}
                        </option>
                      ))}

                    {frequency === "monthly" &&
                      daysOfMonth.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                  </select>
                  {/* <select
                      placeholder="Recurring Day"
                      name="weekday"
                      defaultValue="nil"
                      className="mt-3 ml-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-50"
                    >
                      <option value="nil" disabled>
                        Select a Day
                      </option>
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                      <option value="0">Sunday</option>
                    </select> */}
                </div>
                <div className="mt-3 flex items-center">
                  <label htmlFor="areaOfFocus" className="mr-3 text-gray-400">
                    Recurring Area of Focus
                  </label>
                  <input
                    type="checkbox"
                    name="areaOfFocus"
                    checked={selectedTask!.areaOfFocus}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        areaOfFocus: e.target.checked,
                      } as Task)
                    }
                  />
                  <label htmlFor="alarm" className="mx-3 text-gray-400">
                    Set Alarm
                  </label>
                  <input
                    type="checkbox"
                    name="alarm"
                    checked={selectedTask!.alarm}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        alarm: e.target.checked,
                      } as Task)
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <label htmlFor="note" className="mr-3 text-gray-400 mt-3">
                    Note:
                  </label>
                  <textarea
                    value={selectedTask ? selectedTask.note : ""}
                    name="note"
                    className="mt-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-600"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-700 text-gray-200 font-semibold px-3 py-1 rounded hover:bg-green-600 self-end mr-5"
              >
                Update Task
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
