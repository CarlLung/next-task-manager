import React from "react";
import { Task } from "../../interface/task";
import { DeleteButton } from "../ButtonComponents/DeleteButton";

interface DeleteTaskProps {
  _id: string;
  allTasks: Task[];
  handleAllTasks: (taskslist: Task[]) => void;
}

export const DeleteTask = ({
  _id,
  allTasks,
  handleAllTasks,
}: DeleteTaskProps) => {
  const deleteData = async (event: React.MouseEvent, _id: string) => {
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8080/${_id}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filteredList = allTasks.filter((task: Task) => task._id !== _id);
        handleAllTasks(filteredList);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      alert("failed");
    }
  };

  return (
    <DeleteButton
      onClick={(event: React.MouseEvent) => deleteData(event, _id)}
    />
  );
};
