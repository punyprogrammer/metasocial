import "./userresult.css";
import React from "react";
import { Link } from "react-router-dom";

const UserResult = ({ user }) => {
  return (
    <div className="userResultContainer">
      <img src={user.profilePicture} alt="" className="userResultImage" />
      <div className="userResultInfo">
        <span className="userResultUserName">
          <b>{user.userName}</b>
        </span>
        <span className="userResultCity">
          city:
          {user.city}
        </span>
        <span className="userResultFrom">
          from
          {user.from}
        </span>
      </div>
      <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
        <div className="userResultBtn">
          <button className="userProfileBtn">Profile</button>
        </div>
      </Link>
    </div>
  );
};

export default UserResult;
