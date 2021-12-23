import "./search.css";
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import SearchResults from "../../components/searchresults/SearchResults";
import { useLocation } from "react-router-dom";

const Search = () => {
  console.log(useLocation().pathname);
  const searchQuery = useLocation().pathname.replace("/search/", "");
  console.log(searchQuery);
  return (
    <>
      <Topbar />
      <div className="searchResultsContainer">
        <Sidebar />
        <SearchResults searchQuery={searchQuery} />
        <Rightbar />
      </div>
    </>
  );
};

export default Search;
