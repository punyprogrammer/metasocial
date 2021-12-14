import React from "react";
import "./comment.css";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div className="singleComment">
      <Link
        to={`/profile/${comment.userId}`}
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        <img src={comment.profilePicture} alt="" className="commentImg" />
      </Link>

      <div className="commentContent">
        <Link
          to={`/profile/${comment.userId}`}
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <span className="commentUserName">{comment.username}</span>
        </Link>
        <p className="commentText">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
