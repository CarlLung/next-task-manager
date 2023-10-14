"use client";
import { TabsDisplay } from "../components/DisplayComponents/TabsDisplay";
import { TasksListDisplay } from "../components/DisplayComponents/TasksListDisplay";
import { AddModal } from "../components/CrudComponents/AddModal";
import { filterMap } from "../functions/filters";
import { Task } from "../interface/task";
import { useState, useEffect } from "react";
import { UpdateModal } from "../components/CrudComponents/UpdateModal";
import { DetailsModal } from "../components/DisplayComponents/DetailsModal";
import { GuideModal } from "@/components/DisplayComponents/GuideModal";
import { createPortal } from "react-dom";

const selectedFilter = (selectedTab: keyof typeof filterMap) =>
  filterMap[selectedTab];

const Home = () => {
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof filterMap>("All Tasks");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [guideModalShow, setGuideModalShow] = useState(false);

  const isDue = (task: Task) => {
    return new Date(task.assignedTime) < new Date();
  };

  const handleSelectedTab = (name: keyof typeof filterMap) => {
    setSelectedTab(name);
  };

  const handleSelectedTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  const handleAllTasks = (taskslist: Task[]) => {
    setAllTasks(taskslist);
  };

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

  return (
    <>
      <div
        className="bg-black h-screen w-screen fixed"
        style={{
          backgroundImage: `url('../static/background/alex-perez-ioJBsYQ-pPM-unsplash.jpeg')`,
        }}
      >
        <div className="bg-white h-4/5 w-4/5 mx-auto my-auto opacity-90 fixed top-0 left-0 bottom-0 right-0 rounded-lg overflow-hidden flex">
          <div className="h-full w-1/6 bg-stone-900 pb-4 pt-2 flex flex-col">
            <TabsDisplay
              selectedTab={selectedTab}
              handleSelectedTab={handleSelectedTab}
            />
          </div>

          <div className="h-full w-5/6 bg-neutral-800 px-14 pb-7 pt-4 flex flex-col">
            <TasksListDisplay
              filteredTasks={filteredTasks}
              allTasks={allTasks}
              handleAllTasks={handleAllTasks}
              selectedTask={selectedTask}
              handleSelectedTask={handleSelectedTask}
              selectedTab={selectedTab}
              setAddModalShow={setAddModalShow}
              setUpdateModalShow={setUpdateModalShow}
              setDetailsModalShow={setDetailsModalShow}
              setGuideModalShow={setGuideModalShow}
              isDue={isDue}
            />
          </div>
        </div>

        {addModalShow &&
          createPortal(
            <AddModal
              onClose={() => setAddModalShow(false)}
              allTasks={allTasks}
              handleAllTasks={handleAllTasks}
            />,
            document.getElementById("modal")!
          )}
        {updateModalShow &&
          createPortal(
            <UpdateModal
              onClose={() => setUpdateModalShow(false)}
              allTasks={allTasks}
              handleAllTasks={handleAllTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />,
            document.getElementById("modal")!
          )}
        {detailsModalShow &&
          createPortal(
            <DetailsModal
              onClose={() => setDetailsModalShow(false)}
              selectedTask={selectedTask}
              isDue={isDue}
            />,
            document.getElementById("modal")!
          )}
        {guideModalShow &&
          createPortal(
            <GuideModal onClose={() => setGuideModalShow(false)} />,
            document.getElementById("modal")!
          )}
      </div>
    </>
  );
};

export default Home;
