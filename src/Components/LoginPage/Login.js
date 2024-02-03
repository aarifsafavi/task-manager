import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validId = "12345";
    const validName = "aarif";

    if (id === validId && name === validName) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (storedTasks.length > 0) {
        navigate("/manager");
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <div className="cont-login">
      <div className="cont-box">
        <div className="login">Login</div>
        <div className="cont-input">
          <input
            className="login-input"
            type="text"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="login-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="button-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
