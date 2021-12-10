import React, { useContext } from "react";
import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength="8"
              required
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <Loader type="TailSpin" color="#fff" height={25} width={25} />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot"> Forgot Password</span>
            <Link to="/register">
              <button className="loginRegisterButton" disabled={isFetching}>
                {isFetching ? (
                  <Loader type="TailSpin" color="#fff" height={25} width={25} />
                ) : (
                  "Create a new account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
