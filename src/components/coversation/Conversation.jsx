import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentId = conversation.members.find((e) => e !== currentUser);

    const fetchUser = async () => {
      try {
        //get current user
        const response = await axios.get(
          `https://amarsocial.herokuapp.com/api/users/${currentId}`
        );

        console.log(response.data);
        setUser(response.data);
      } catch (error) {}
    };
    fetchUser();
  }, [currentUser, conversation]);
  return (
    <>
      <div className="conversation">
        <div className="conversationWrapper">
          <img
            src={user?.profilePicture}
            alt=""
            className="conversationUserImg"
          />
          <span className="conversationUserName">{user?.userName}</span>
        </div>
      </div>
    </>
  );
};

export default Conversation;
