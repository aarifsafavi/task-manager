import React from "react";
import { useNavigate } from "react-router-dom";
import userImage from "./user.jpg";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-item">
          <div className="profile">
            <img src={userImage} alt="Profile" className="profile-pic" />
            <span className="profile-name">Aarif</span>
          </div>
          <div className="logout">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
