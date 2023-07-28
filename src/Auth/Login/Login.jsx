import React, { useEffect, useState } from "react";
import "./Login.scss";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/reduxToolkit/extraReducer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import { loadBundle } from "firebase/firestore";
const Login = () => {
  const { user, loading, error } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  // auth.onAuthStateChanged((user) => {
  //   setUser(user);
  // });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest(data));
    if (user) {
      navigate("/home");
    }
  };
  console.log(error)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user?.user?.email);
    }
  }, [user, loading]);
  return (
    <div className="main_sign">
      <div className="sign_in_card">
        <form onSubmit={handleLogin}>
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
        <a href="/register"> Don't  have an account? Register</a>

      </div>
    </div>
  );
};

export default Login;
