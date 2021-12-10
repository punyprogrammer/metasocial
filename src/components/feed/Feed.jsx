import React, { useContext } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      let response;
      if (userId) {
        response = await axios.get(
          `https://amarsocial.herokuapp.com/api/posts/profile/${userId}`
        );
        setPosts(response.data);
      } else {
        response = await axios.get(
          `https://amarsocial.herokuapp.com/api/posts/timeline/${user._id}`
        );
        setPosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
      //
    };
    fetchPosts();
  }, [userId]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
