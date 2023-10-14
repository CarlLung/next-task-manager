import React from "react";
import { Task } from "../../interface/task";
import { CompleteButton } from "../ButtonComponents/CompleteButton";

interface CompleteTaskProps {
  _id: string;
  allTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
}

export const CompleteTask = ({
  _id,
  allTasks,
  handleAllTasks,
}: CompleteTaskProps) => {
  const updateData = async (event: React.MouseEvent, _id: string) => {
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8080/${_id}/update`, {
        method: "PUT",
      });

      if (response.ok) {
        const newList = allTasks.map((task: Task) => {
          if (task._id === _id && task.routine === "nil") {
            return { ...task, completed: true };
          } else if (task._id === _id && task.routine === "weekly") {
            return {
              ...task,
              assignedTime: new Date(
                task.assignedTime.getTime() + 7 * 24 * 60 * 60 * 1000
              ),
            };
          } else if (task._id === _id && task.routine === "monthly") {
            let newDate = new Date(task.assignedTime);
            newDate.setMonth(newDate.getMonth() + 1);
            if (newDate.getDate() !== task.assignedTime.getDate()) {
              newDate.setDate(0);
            }
            return {
              ...task,
              assignedTime: newDate,
            };
          } else if (task._id === _id && task.routine === "daily") {
            return {
              ...task,
              assignedTime: new Date(
                task.assignedTime.getTime() + 24 * 60 * 60 * 1000
              ),
            };
          } else {
            return task;
          }
        });
        handleAllTasks(newList);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      alert("failed");
    }
  };

  return (
    <CompleteButton
      onClick={(event: React.MouseEvent) => updateData(event, _id)}
    />
  );
};
