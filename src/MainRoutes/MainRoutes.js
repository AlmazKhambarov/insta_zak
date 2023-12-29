/** @format */

import { Route, Routes } from "react-router-dom";
import App from "../App";
import Register from "../Auth/Register/Register";
import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import Login from "../Auth/Login/Login";
import UserSetting from "../pages/User/UserSetting/UserSetting";
import UserProfile from "../pages/User/UserProfile/UserProfile";
import UserOrder from "../pages/User/UserOrder/UserOrder";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Posts from "../pages/Posts/Posts";
import UserUpload from "../pages/User/UserUpload/UserUpload";
import User from "../pages/User/User/User";

const MainRoutes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
useEffect(()=>{
    auth.onAuthStateChanged((user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  });

},[ ])

  const nonAuth = [
    { id: 1, path: "/", element: <Login /> },
    { id: 1, path: "/register", element: <Register /> },
  ];
  const afterAuth = [
    { id: 1, path: "/", element: <Posts user={user}/> },
    { id: 2, path: "/home", element: <Home /> },
    { id: 3, path: "/profile", element: <UserProfile user={user} /> },
    { id: 4, path: "/upload", element: <UserUpload user={user} /> },
    { id: 3, path: "/profile", element: <UserProfile user={user} /> },
    { id: 5, path: "/user/:id", element: <User user={user} /> },
    // { id: 6, path: "/home/comment/:id", element: <CommentModal user={user} /> },
  ];
//   console.log(user);
  return (
    <div style={{ display: "flex" }}>
      {user ? <Layout /> : null}
      <Routes>
        {user
          ? afterAuth.map((route) => (
              <Route path={route.path} key={route.id} element={route.element} />
            ))
          : nonAuth.map((route) => (
              <Route path={route.path} key={route.id} element={route.element} />
            ))}
      </Routes>
    </div>
  );
};
export default MainRoutes;
