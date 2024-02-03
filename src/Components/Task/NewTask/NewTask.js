import "./NewTask.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

function NewTask({ modalOpen, setModalOpen, onTaskSubmit, selectedTask }) {
  const modalClose = useRef(null);
  const navigate = useNavigate();
  const [task, setTask] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask.name);
    } else {
      setTask("");
    }
  }, [selectedTask]);

  const handleClickOutside = (event) => {
    if (modalClose.current && !modalClose.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: task.trim(),
      };

      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...existingTasks, newTask];
      onTaskSubmit(newTask);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask("");
      setModalOpen(false);

      if (updatedTasks.length !== 0) {
        navigate("/manager");
      }
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="newtask-bg">
          <form
            className="newtask-form"
            ref={modalClose}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="newtask-input">
              <div className="newtask-title">
                {selectedTask ? "Edit Task" : "+New Task"}
              </div>
              <div className="newtask-placeholder">
                <input
                  className="newtask-task"
                  type="text"
                  id="title"
                  placeholder="Task Name"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                ></input>
              </div>
              <button className="newtask-btn" type="submit">
                {selectedTask ? "Update Task" : "+ New Task"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default NewTask;
