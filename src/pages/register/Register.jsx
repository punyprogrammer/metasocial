import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useNavigate();
  //function to redirect to loginpage
  const RedirectLogin = (e) => {
    e.preventDefault();
    history("/login");
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords dont match!!");
    } else {
      const user = {
        userName: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          "https://amarsocial.herokuapp.com/api/auth/register",
          user
        );

        history("/login");
      } catch (error) {}
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MetaSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MetaSocial
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              required
              className="loginInput"
              ref={username}
            />

            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              minLength={8}
              ref={password}
              required
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
              ref={confirmPassword}
            />

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="loginForgot">
              Already have a account?login below
            </span>

            <button
              type="button"
              className="loginRegisterButton"
              onClick={RedirectLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
