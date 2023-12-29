import React, { useState } from "react";
import "./Home.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/firebase";
const Home = () => {
  const [user,setUser] = useState('')
  auth.onAuthStateChanged((user) => {
    setUser(user);
    localStorage.setItem("username", user?.displayName);
  });

  
  
};

export default Home;
