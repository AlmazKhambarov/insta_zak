import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAndProfileAsync,
  signUpUser,
} from "../../redux/reduxToolkit/extraReducer";
import { red } from "@mui/material/colors";

const Register = () => {
  const { user, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUserAndProfileAsync(data));
  };

  console.log(user);
  return (
    <div className="main_sign">
      <div className="sign_in_card">
        <h3>Create Profile</h3>
        <form onSubmit={handleRegister}>
          <div>
            <span style={{color:"red"}}>{error ? error : null}</span>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              onChange={(e) =>
                setData((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <a href="/"> Did you have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;
