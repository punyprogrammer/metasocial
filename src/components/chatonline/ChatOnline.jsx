import React from "react";
import "./chatonline.css";

const ChatOnline = () => {
  return (
    <>
      <div className="chatOnlineContainer">
        <div className="chatOnlineImgContainer">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/metasocial-img.appspot.com/o/images%2Falbert.jpg1639236279165?alt=media&token=e817a47e-69c1-47ca-b2eb-6e9f2497e1c5"
            alt=""
            className="chatOnlineUserImg"
          />
          <span className="chatOnlineUserBadge"></span>
        </div>
        <span className="chatOnlineUserName">Albert King</span>
      </div>
    </>
  );
};

export default ChatOnline;
