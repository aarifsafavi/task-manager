import React, { useState } from "react";
import "./NoTask.css";
import NewTask from "../NewTask/NewTask";

const NoTask = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleTaskSubmit = (newTask) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...newTask, id: selectedTask.id } : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
    } else {
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="notask-bg">
        <div className="notask-cont">
          <div className="notask-input">
            <div className="notask-text">You have no task.</div>
            <button className="notask-btn" onClick={() => setModalOpen(true)}>
              + New Task
            </button>
          </div>
        </div>
      </div>
      <NewTask
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onTaskSubmit={handleTaskSubmit}
      />
    </>
  );
};

export default NoTask;
