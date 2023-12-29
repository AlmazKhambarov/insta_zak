/** @format */

import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Password, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/reduxToolkit/extraReducer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import { loadBundle } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "../../assets/images/Instargram-Logo.png"
import { Button } from "antd";
const Login = () => {
  const { user, loading, error } = useSelector((state) => state.login);
  const [errors, setErrors] = useState();
  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return user;
    } catch (error) {
      setErrors(error);
      console.log(error);
    }
  };
  console.log(error);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user?.user?.email);
    }
  }, [user, loading]);
  return (
    <div className='main_sign'>
      <div className='sign_in_card'>
      <div className="logo__container">
        <img src={logo} alt="" />
      </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type='text'
              placeholder='Email'
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              placeholder='password'
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <Button onClick={handleLogin} type='primary'>
            Sign In
          </Button>
        </form>
        <a href='/register'> Don't have an account? Register</a>
      </div>
    </div>
  );
};

export default Login;
