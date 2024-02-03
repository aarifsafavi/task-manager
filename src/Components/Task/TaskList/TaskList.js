import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewTask from "../NewTask/NewTask";
import "./TaskList.css";
import editIcon from "./pen-solid.png";
import deleteIcon from "./trash-solid.png";
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Header from "../../Header/Header";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";

Chart.register(ArcElement);

const TaskList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [latestTasks, setLatestTasks] = useState([]);
  const navigate = useNavigate();
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const totalTasksCount = tasks.length;

  //sort the data fron the latest
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.sort((a, b) => b.id - a.id);
    setTasks(storedTasks);

    const latest = storedTasks.slice(0, 3);
    setLatestTasks(latest);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //handle the submitted data
  const handleTaskSubmit = (newTask) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...newTask, id: selectedTask.id } : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
    } else {
      const updatedTasks = [newTask, ...tasks];

      const latest = updatedTasks.slice(0, 3);
      setLatestTasks(latest);

      setTasks(updatedTasks);
      setModalOpen(false);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  //handle delete item
  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (updatedTasks.length === 0) {
      navigate("/home");
    }
  };

  //handle edit item
  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  //handle checkbox
  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //pie chart
  const pieChartData = {
    labels: ["Completed Tasks", "Remaining Tasks"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [completedTasksCount, totalTasksCount - completedTasksCount],
        backgroundColor: ["#5285EC", "#E8ECEC"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        textAlign: "center",
        font: {
          size: 10,
          weight: "normal",
        },
        formatter: (value, context) => {
          return context.dataset.label;
        },
      },
    },
  };

  return (
    <>
      <Header />

      {/* task counter */}

      <div className="manager-cont">
        <div className="completed-cont">
          <div className="completed-input">
            <div className="completed-name">Tasks Completed</div>
            <div className="completed-counter">
              <div className="completed-task">{completedTasksCount}</div>
              <div className="completed-total">/{totalTasksCount}</div>
            </div>
          </div>
        </div>

        {/* latest task container */}

        <div className="latest-task">
          <div className="latest-cont">
            <div className="latest-name">Latest Created Tasks</div>
            <ul>
              {latestTasks.map((task) => (
                <li key={task.id}>
                  <span className={task.completed ? "completed" : ""}>
                    {task.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* pie chart container */}

        <div className="chart-cont">
          <div className="piechart">
            <Pie type="pie" data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* listed task */}

      <div className="tasklist-cont">
        <div className="list-body">
          <div className="list-header">
            <p className="list-name">Tasks</p>
            <div className="search-bar"></div>
            <input
              className="list-searchinput"
              type="text"
              placeholder="Search by task name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="listbtn-new" onClick={() => setModalOpen(true)}>
              + New Task
            </button>
          </div>

          <div className="list-cont">
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.id}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.name}
                  </span>
                  <div className="cont-func">
                    <img
                      className="edit-icon"
                      src={editIcon}
                      alt="edit"
                      onClick={() => handleEdit(task)}
                    ></img>
                    <img
                      src={deleteIcon}
                      alt="edit"
                      onClick={() => handleDelete(task.id)}
                    ></img>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <NewTask
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedTask={selectedTask}
            onTaskSubmit={handleTaskSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default TaskList;
