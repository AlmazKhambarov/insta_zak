/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAndProfileAsync } from "../../redux/reduxToolkit/extraReducer";
import logo from "../../assets/images/Instargram-Logo.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU",
  });
  let navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUserAndProfileAsync(data));
    navigate("/");
  };

  console.log(user);
  return (
    <div className='main_sign'>
      <div className='sign_in_card'>
        <div className='logo__container'>
          <img src={logo} alt='' />
        </div>
        <h3>Create Profile</h3>
        <form onSubmit={handleRegister}>
          <div>
            <span style={{ color: "red" }}>{error ? error : null}</span>
            <label>Username</label>
            <input
              type='text'
              placeholder='username'
              onChange={(e) =>
                setData((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </div>
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
          <Button htmlType='submit' type='primary'>
            Sign In
          </Button>
        </form>
        <a href='/'> Did you have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;
