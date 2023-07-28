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
    <div>
      <div className="sidebar">
        <ul>
          <li className="logo">
            <a href="/home">
              <span className="icon">
                <img className="logoDrop" src={insta_logo} />
              </span>
              <NavLink className="text">Instagram</NavLink>
            </a>
          </li>
          <li>
            <a href="/home">
              <span className="icon">
                <HomeIcon />
              </span>
              <NavLink className="text">Home</NavLink>
            </a>
          </li>
          <li>
            <a href="/home/user">
              <span className="icon">
                <Person2Icon />
              </span>
              <NavLink className="text">Profile</NavLink>
            </a>
          </li>
          <li>
            <a href="/home/upload">
              <span className="icon">
                <AddCircleOutlineIcon />
              </span>
              <NavLink className="text">Create</NavLink>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <SignalCellularAltIcon />
              </span>
              <NavLink className="text">Analytics</NavLink>
            </a>
          </li>
          <li>
            <a href="/home/order">
              <span className="icon">
                <BookmarkBorderIcon />
              </span>
              <NavLink className="text">Order</NavLink>
            </a>
          </li>
          <li>
            <a href="/home/setting">
              <span className="icon">
                <SettingsIcon />
              </span>
              <NavLink className="text">Setting</NavLink>
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
