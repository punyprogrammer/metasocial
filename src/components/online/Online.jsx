import React from "react";
import "./online.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Online = ({ user }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={`${PF}${user.profilePicture}`}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarProfileName">{user.username}</span>
    </li>
  );
};

export default Online;
