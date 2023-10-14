import { useState, useEffect } from "react";
import { Task } from "@/interface/task";
import { filterMap } from "@/functions/filters";

export const selectedFilter = (selectedTab: keyof typeof filterMap) =>
  filterMap[selectedTab];

type TasksProps = { selectedTab: keyof typeof filterMap };

export const useTasks = ({ selectedTab }: TasksProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8080/");
      const data = await response.json();
      const fetchedList = data.data.filter(
        (task: Task) => task.completed !== true
      );
      setAllTasks(fetchedList);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(allTasks.filter(selectedFilter(selectedTab)));
  }, [allTasks, selectedTab]);

  const handleSelectedTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  //   const deleteTask = (task: Task | null) => {
  //     const filteredList = allTasks.filter((task: Task) => task._id !== _id);
  //   };

  return {
    allTasks,
    setAllTasks,
    filteredTasks,
    setFilteredTasks,
    selectedTask,
    setSelectedTask,
  };
};
