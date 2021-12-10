import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const PF = "https://amarsocial.herokuapp.com/images/";

const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  //onst image = `${PF}${post.photo}`;
  // const user = Users.filter((e) => {
  //   return e.id === post.userId;
  // });
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/users/${post.userId}`
      );

      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = async () => {
    try {
      await axios.put(
        "https://amarsocial.herokuapp.com/api/posts/" + post._id + "/like",
        {
          userId: currentUser._id,
        }
      );
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);

    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "avatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>

            <span className="postUsername">{user.userName}</span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description} </span>
          <img src={`${PF}${post.img}`} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}love.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postlikeCounter"> {like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
