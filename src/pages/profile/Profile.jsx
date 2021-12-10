import React, { useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Feed from "../../components/feed/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const PF = "https://amarsocial.herokuapp.com/images/";
const Profile = () => {
  const [user, setUser] = useState([]);
  const path = useLocation().pathname;
  const [ppfile, setPpfile] = useState(null);
  const [cpfile, setCpfile] = useState(null);
  const userId = path.replace("/profile/", "");
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/users/${userId}`
      );

      setUser(response.data);
    };
    fetchUser();
  }, [userId, currentUser]);
  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (cpfile) {
      const data = new FormData();
      const filename = Date.now() + cpfile.name;
      data.append("name", filename);
      data.append("file", cpfile);
      currentUser.coverPicture = filename;
      currentUser.userId = currentUser._id;
      try {
        await axios.post("https://amarsocial.herokuapp.com/api/upload", data, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        });
      } catch (error) {}
    }
    try {
      const res = await axios.put(
        "https://amarsocial.herokuapp.com/api/users/" + currentUser._id,
        currentUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res });
      alert("Cover photo  updated!!");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (ppfile) {
      const data = new FormData();
      const filename = Date.now() + ppfile.name;
      data.append("name", filename);
      data.append("file", ppfile);
      currentUser.profilePicture = filename;
      currentUser.userId = currentUser._id;
      try {
        await axios.post("https://amarsocial.herokuapp.com/api/upload", data, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        });
      } catch (error) {}
    }
    try {
      const res = await axios.put(
        "https://amarsocial.herokuapp.com/api/users/" + currentUser._id,
        currentUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res });
      alert("Profile  photo  updated!!");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  cpfile
                    ? URL.createObjectURL(cpfile)
                    : user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "no-cover.jpg"
                }
                alt=""
                className="profileCoverImg"
              />
              <label htmlFor="coverFileInput">
                <CameraAltIcon className="coverCameraIcon" />
              </label>
              <input
                type="file"
                id="coverFileInput"
                style={{ display: "none" }}
                onChange={(e) => setCpfile(e.target.files[0])}
              />
              {cpfile && (
                <button className="coverBtn" onClick={handleCoverSubmit}>
                  Update
                </button>
              )}

              <div className="profileImgContainer">
                <img
                  src={
                    ppfile
                      ? URL.createObjectURL(ppfile)
                      : user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "avatar.png"
                  }
                  alt=""
                  className="profileUserImg"
                />
                <label htmlFor="profileFileInput">
                  <CameraAltIcon className="profileCameraIcon" />
                </label>
                <input
                  type="file"
                  id="profileFileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setPpfile(e.target.files[0])}
                />
                {ppfile && (
                  <button className="profileBtn" onClick={handleProfileSubmit}>
                    Update
                  </button>
                )}
              </div>
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDescription">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={userId} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
