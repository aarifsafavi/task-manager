import Login from "./Components/LoginPage/Login";
import Home from "./Components/HomePage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Manager from "./Components/Manager/Manager";
import React from "react";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/manager" element={<Manager />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
