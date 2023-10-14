import React, { useState, useEffect, useCallback } from "react";
import { Task } from "../../interface/task";
import { v4 as uuidv4 } from "uuid";
import { AddTaskButton } from "@/static/AddTaskButton";

interface AddTaskPayload {
  content: string;
  assignedTime: Date;
  priority: string;
  routine: string;
  areaOfFocus: boolean;
  alarm: boolean;
  note: string;
  weekday: number | "nil";
}

interface AddTaskProps {
  allTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
  onClose: () => void;
}

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

const extractFormData = (
  event: React.FormEvent<HTMLFormElement>
): AddTaskPayload => {
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

export const AddModal: React.FC<AddTaskProps> = ({
  onClose,
  allTasks,
  handleAllTasks,
}) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  const [formData, setFormData] = useState<AddTaskPayload>({
    content: "",
    assignedTime: new Date("invalid input"),
    priority: "1st",
    routine: "nil",
    areaOfFocus: false,
    alarm: false,
    note: "",
    weekday: "nil",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("nil");
  const [day, setDay] = useState("nil");

  const validate = (data: AddTaskPayload) => {
    let currentErrors = [];

    if (!data.content.trim()) {
      currentErrors.push("Task name cannot be empty.");
    }
    if (frequency !== "nil" && frequency !== "daily" && day === "nil") {
      currentErrors.push("Please choose a recurring day.");
    }
    if (
      data.routine === "monthly" &&
      data.weekday !== data.assignedTime.getDate()
    ) {
      currentErrors.push(
        "Please select the same recurring day as the assigned date"
      );
    }
    if (
      data.routine === "weekly" &&
      data.weekday !== data.assignedTime.getDay()
    ) {
      console.log(data.weekday);
      currentErrors.push(
        "Please select the same recurring day as the assigned date"
      );
    }
    if (isNaN(data.assignedTime.getTime())) {
      currentErrors.push("Please choose the date and time.");
    }
    return currentErrors;
  };

  useEffect(() => {
    if (!isFormTouched) return;
    const validationErrors = validate(formData);
    console.log(validationErrors);
    setErrors(validationErrors);
    setIsValidForm(validationErrors.length === 0);
  }, [formData]);

  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputData = extractFormData(event);
    const validationErrors = validate(inputData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    const newTask: Task = {
      _id: uuidv4(),
      content: inputData.content,
      createdTime: new Date(),
      assignedTime: inputData.assignedTime,
      priority: inputData.priority,
      completed: false,
      routine: inputData.routine,
      areaOfFocus: inputData.areaOfFocus,
      alarm: inputData.alarm,
      note: inputData.note,
      weekday: inputData.weekday,
    };

    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const newList = [...allTasks, newTask];
        // try {
        //   const response = await fetch("http://localhost:8080/tasks", {
        //     method: "POST",

        //     body: JSON.stringify({
        //       id: "001",
        //       title: "001",
        //     }),
        //   });
        // } catch (error) {
        //   console.error(error);
        // }
        handleAllTasks(newList);
        onClose();
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const deriveWeekdayOrMonthday = (value: string): number | "nil" => {
  //   if (frequency === "weekly") {
  //     return daysOfWeek.indexOf(value) + 1;
  //   } else if (frequency === "monthly") {
  //     return parseInt(value);
  //   }
  //   return "nil";
  // };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="w-1/2 h-8/12 bg-white rounded-xl">
        <section>
          <div className="bg-stone-900 rounded-t-xl flex opacity-90">
            <h3 className="text-gray-400 font-semibold p-3 flex items-center fill-red-600">
              <AddTaskButton />
              <span>Add Task</span>
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-semibold px-3 py-1 rounded hover:text-red-600 ml-auto mr-7"
            >
              Close
            </button>
          </div>
          <div className="bg-stone-900 text-gray-900 px-5 pb-6 pt-1 rounded-b-xl opacity-90">
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
            <form
              onSubmit={handleAddItem}
              className="flex flex-col"
              onChange={() => setIsFormTouched(true)}
            >
              <div className="p-5">
                <div className="flex">
                  <input
                    placeholder="Task"
                    name="content"
                    className="w-8/12 h-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-600"
                  />
                  <input
                    placeholder="Time"
                    type="datetime-local"
                    name="assignedTime"
                    className="w-4/12 border border-gray-400 rounded-lg p-2 ml-3 bg-gray-400 opacity-40 placeholder-gray-50"
                  />
                </div>
                <select
                  placeholder="Priority"
                  name="priority"
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
                  <div className="flex flex-col">
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
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
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <label htmlFor="areaOfFocus" className="mr-3 text-gray-400">
                    Recurring Area of Focus
                  </label>
                  <input type="checkbox" name="areaOfFocus" />
                  <label htmlFor="alarm" className="mx-3 text-gray-400">
                    Set Alarm
                  </label>
                  <input type="checkbox" name="alarm" />
                </div>
                <textarea
                  placeholder="Note"
                  name="note"
                  className="mt-3 w-full border border-gray-400 rounded-lg p-2 bg-gray-400 opacity-40 placeholder-gray-600"
                />
              </div>
              <button
                type="submit"
                className="bg-green-700 text-gray-200 font-semibold px-3 py-1 rounded hover:bg-green-600 self-end mr-5"
              >
                Add Task
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
