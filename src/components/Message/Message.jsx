import React, { useState, useEffect } from "react";
import "./message.css";
import axios from "axios";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //get current user
        const response = await axios.get(
          `https://amarsocial.herokuapp.com/api/users/${message?.sender}`
        );

        console.log(response.data);
        setUser(response.data);
      } catch (error) {}
    };
    fetchUser();
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={user?.profilePicture} alt="" className="messageUserImg" />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
};

export default Message;
