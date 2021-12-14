import "./searchresults.css";
import React, { useState, useEffect } from "react";
import Post from "../../components/post/Post";
import UserResult from "../../components/userresult/UserResult";
import axios from "axios";

const SearchResults = ({ searchQuery }) => {
  const [postResults, setPostResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [nbHits, setNbHits] = useState(0);

  //useEffect to fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/search?searchQuery=${searchQuery}`
      );
      setPostResults(response.data.postResults);
      setUserResults(response.data.userResults);
      setNbHits(response.data.nbHits);
    };
    fetchSearchResults();
  }, [searchQuery]);
  return (
    <div className="searchResultsWrapper">
      <h1 className="searchResultsHeader">{nbHits} Search Results..</h1>
      <div className="userResultsWrapper">
        <span className="userResultsCount">
          {userResults.length} User Results
        </span>
        {userResults.map((u) => {
          return <UserResult key={u._id} user={u} />;
        })}
      </div>
      <div className="postsWrapper">
        <span className="postResultsCount">
          {postResults.length} Post Results
        </span>
        {postResults.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </div>
  );
};

export default SearchResults;
