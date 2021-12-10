import React from "react";
import "./closefriend.css";
const PF = "https://amarsocial.herokuapp.com/images/";
const CloseFriend = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img
        src={`${PF}${user.profilePicture}`}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
