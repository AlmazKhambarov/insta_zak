import React from "react";
import "./Sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import MailIcon from "@mui/icons-material/Mail";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import insta_logo from "../../assets/images/insta_logo.jpg";
import { auth } from "../../api/firebase";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const handleLogout = () => {
    var confirBox = alert("Are you sure to Log out it?");
    // if (confirBox) {
    auth.signOut();
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div style={{width:"17%"}}>
      <div className="sidebar">
        <ul>
          <li className="logo">
            <a href="/">
              <span className="icon">
                <img className="logoDrop" src={insta_logo} />
              </span>
              <p className="text">Instagram</p>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <HomeIcon />
              </span>
              <p className="text">Home</p>
            </a>
          </li>
          <li>
            <a href="/profile">
              <span className="icon">
                <Person2Icon />
              </span>
              <p className="text">Profile</p>
            </a>
          </li>
          <li>
            <a href="/upload">
              <span className="icon">
                <AddCircleOutlineIcon />
              </span>
              <p className="text">Create</p>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <SignalCellularAltIcon />
              </span>
              <p className="text">Analytics</p>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <BookmarkBorderIcon />
              </span>
              <p className="text">Order</p>
            </a>
          </li>
          <li>
            <a href="/setting">
              <span className="icon">
                <SettingsIcon />
              </span>
              <p className="text">Setting</p>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a href="#">
              <span className="icon">
                <LogoutIcon />
              </span>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
