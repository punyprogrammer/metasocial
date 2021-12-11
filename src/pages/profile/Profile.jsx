import React, { useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Feed from "../../components/feed/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import { projectStorage, projectFirestore } from "../../firebaseConfig";
import firebase from "firebase";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const PF = "https://amarsocial.herokuapp.com/images/";
const Profile = () => {
  const [user, setUser] = useState([]);
  const path = useLocation().pathname;
  const [ppfile, setPpfile] = useState(null);
  const [cpfile, setCpfile] = useState(null);
  const [cpuploading, setCpUploading] = useState(false);
  const [ppuploading, setPpUploading] = useState(false);
  const [ppurl, setPpUrl] = useState("");
  const [cpurl, setCpUrl] = useState("");
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
  }, [userId]);
  //cp file upload
  const handleProfileUpload = (e) => {
    e.preventDefault();
    setPpUploading(true);
    const fileName = ppfile.name + Date.now();
    const uploadTask = projectStorage.ref(`images/${fileName}`).put(ppfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        projectStorage
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            setPpUrl(url);
            setPpUploading(false);
          });
      }
    );
  };
  const handleCoverUpload = (e) => {
    e.preventDefault();
    setCpUploading(true);
    const fileName = cpfile.name + Date.now();
    const uploadTask = projectStorage.ref(`images/${fileName}`).put(cpfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        projectStorage
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            setCpUrl(url);
            setCpUploading(false);
          });
      }
    );
  };

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    currentUser.coverPicture = cpurl;
    currentUser.userId = currentUser._id;
    dispatch({ type: "UPDATE_START" });
    try {
      const res = await axios.put(
        "https://amarsocial.herokuapp.com/api/users/" + currentUser._id,
        currentUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      alert("Cover photo  updated!!");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    currentUser.profilePicture = ppurl;
    currentUser.userId = currentUser._id;
    try {
      const res = await axios.put(
        "https://amarsocial.herokuapp.com/api/users/" + currentUser._id,
        currentUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setPpfile(null);
      // alert("Profile  photo  updated!!");
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
                    ? user.coverPicture
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
                <button
                  className="coverBtn"
                  onClick={handleCoverSubmit}
                  disabled={cpuploading}
                >
                  {cpuploading ? "Wait.." : "Update"}
                </button>
              )}
              {cpfile && (
                <button
                  className="coverBtn2"
                  onClick={handleCoverUpload}
                  disabled={cpuploading}
                >
                  {cpuploading ? "Uploading.." : "Upload"}
                </button>
              )}

              <div className="profileImgContainer">
                <img
                  src={
                    ppfile
                      ? URL.createObjectURL(ppfile)
                      : user.profilePicture
                      ? user.profilePicture
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
                  <button
                    className="profileBtn"
                    onClick={handleProfileSubmit}
                    disabled={ppuploading}
                  >
                    {ppuploading ? "Wait..." : "Update"}
                  </button>
                )}
                {ppfile && (
                  <button
                    className="profileBtn2"
                    onClick={handleProfileUpload}
                    disabled={ppuploading}
                  >
                    {ppuploading ? "Uploading..." : "Upload"}
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
