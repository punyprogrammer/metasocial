import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPlayer from "react-player";
import "./post.css";
import { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Comments } from "../../dummy";
import SendIcon from "@mui/icons-material/Send";
import { projectStorage, projectFirestore } from "../../firebaseConfig";
import Comment from "../comments/Comment";
const PF = "https://amarsocial.herokuapp.com/images/";

const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  //onst image = `${PF}${post.photo}`;
  // const user = Users.filter((e) => {
  //   return e.id === post.userId;
  // });

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [commentslist, setCommentsList] = useState([]);
  const [video, setVideo] = useState(false);
  const [videourl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);

  const [user, setUser] = useState({});
  const commentText = useRef();
  //function to check video
  const isVideo = (src) => {
    return src.includes(".mp4");
  };
  //useEffect
  useEffect(() => {
    if (isVideo(post.img)) {
      projectStorage
        .ref("images")
        .child(post.videoUrl)
        .getDownloadURL()
        .then((url) => {
          setVideoUrl(url);
          console.log(url);
        });
    }
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/users/${post.userId}`
      );

      setUser(response.data);
    };
    fetchUser();
  }, []);
  //useEffect to update comments
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/posts/${post._id}/comment`
      );
      setCommentsList(response.data.comments.sort((a, b) => b._id - a._id));
    };
    fetchComments();
  }, []);
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
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://amarsocial.herokuapp.com/api/posts/${post._id}/comment`,
        {
          _id: Date.now(),
          username: currentUser.userName,
          userId: currentUser._id,
          profilePicture: currentUser.profilePicture,
          comment: commentText.current.value,
        }
      );
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/posts/${post._id}/comment`
      );
      setCommentsList(response.data.comments.sort((a, b) => b._id - a._id));
      commentText.current.value = "";
    } catch (err) {}
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img
                src={
                  user.profilePicture ? user.profilePicture : PF + "avatar.png"
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
          {isVideo(post.img) ? (
            videourl && (
              <div className="videoplayerWrapper">
                {playing&&(<PlayArrowIcon
                  style={{ fontSize: "100px" }}
                  className="playIcon"
                  onClick={() => setPlaying(true)}
                />)}
                <ReactPlayer
                  id="myVedio"
                  url={videourl}
                  className="videoContainer"
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls={true}
                  volume={1}
                  progressInterval={5000}
                  pip={true}
                />
              </div>
            )
          ) : (
            <img src={`${post.img}`} alt="" className="postImg" />
          )}
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
            <span className="postCommentText">
              {commentslist.length} Comments
            </span>
          </div>
        </div>
        <div className="postCommentsWrapper">
          <div className="writeCommentContainer">
            <img
              src={currentUser.profilePicture}
              alt=""
              className="writeCommentImg"
            />
            <input
              type="text"
              className="commentInput"
              placeholder="Add your Comment..."
              ref={commentText}
            />
            <SendIcon
              onClick={submitComment}
              style={{ padding: "10px", cursor: "pointer" }}
            />
          </div>
          <div className="postedCommentsContainer">
            {commentslist.slice(0, 4).map((e) => {
              return <Comment key={e.id} comment={e} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
