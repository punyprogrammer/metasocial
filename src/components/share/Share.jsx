import React, { useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import { projectStorage, projectFirestore } from "../../firebaseConfig";
import axios from "axios";
import "./share.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const PF = "https://amarsocial.herokuapp.com/images/";

const Share = () => {
  const { user } = useContext(AuthContext);
  const sharedesc = useRef("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(" ");
  const [uploading, setUploading] = useState(false);
  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    const fileName = file.name + Date.now();
    const uploadTask = projectStorage.ref(`images/${fileName}`).put(file);
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
            setUrl(url);
            setUploading(false);
          });
      }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let newPost = {
      userId: user._id,
      description: sharedesc.current.value,
    };
    if (file) {
      newPost.img = url;
    }

    try {
      await axios.post("https://amarsocial.herokuapp.com/api/posts", newPost, {
        "Access-Control-Allow-Origin": "*",
      });

      window.location.reload();
    } catch (error) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            type="text"
            src={
              user.profilePicture ?  user.profilePicture : PF + "avatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind ${user.userName} ?`}
            className="shareInput"
            ref={sharedesc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <div className="shareBottom">
          <form className="shareOptions" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="#cddc39" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LocalOfferIcon htmlColor="#1e88e5" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <LocationOnIcon htmlColor="#ab47bc" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="#ffca28" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
              {file && (
                <button
                  className="shareButton"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading" : "Upload"}
                </button>
              )}
              <button
                className="shareButton"
                type="submit"
                disabled={uploading}
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Share;
