import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Select from "react-select";

const PF = "https://amarsocial.herokuapp.com/images/";
const actions = [
  { label: "Single", value: "Single" },
  { label: "In a Relationship", value: "In a Relationship" },
  { label: "Married", value: "Married" },
];

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [updateMode, setUpdateMode] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser.followings && currentUser.followings.includes(user?._id)
  );
  const city = useRef(currentUser.city);
  const from = useRef(currentUser.from);
  const relationship = useRef("Single");

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "https://amarsocial.herokuapp.com/api/users/friends/" + user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        currentUser.followings &&
        currentUser.followings.includes(user?._id)
      ) {
        await axios.put(
          `https://amarsocial.herokuapp.com/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `https://amarsocial.herokuapp.com/api/users/${user._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    currentUser.city = city.current.value;
    currentUser.from = from.current.value;
    currentUser.userId = currentUser._id;
    try {
      const res = await axios.put(
        "https://amarsocial.herokuapp.com/api/users/" + currentUser._id,
        currentUser
      );
      alert("Profile details  updated!!");
      setUpdateMode(false);
      dispatch({ type: "UPDATE_SUCCESS", payload: res });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "present.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.jpg"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.userName !== currentUser.userName && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentUser.followings &&
            currentUser.followings.includes(user?._id)
              ? "Unfollow"
              : "Follow"}
            {currentUser.followings &&
            currentUser.followings.includes(user?._id) ? (
              <Remove />
            ) : (
              <Add />
            )}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {updateMode ? (
              <input type="text" className="rightbarInfoKey" ref={city} />
            ) : (
              <span className="rightbarInfoValue">{user.city}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {updateMode ? (
              <input type="text" className="rightbarInfoKey" ref={from} />
            ) : (
              <span className="rightbarInfoValue">{user.from}</span>
            )}
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
            <Select
              options={actions}
              ref={relationship}
              onChange={(e) => {
                console.log(relationship.current.value);
              }}
            />
            <span>{relationship && relationship.current.value}</span>
          </div> */}
          <div className="rightbarInfoItem">
            {user._id === currentUser._id &&
              (updateMode ? (
                <button className="updateDetailsBtn" onClick={handleSubmit}>
                  Save
                </button>
              ) : (
                <button
                  className="updateDetailsBtn"
                  onClick={(e) => setUpdateMode(!updateMode)}
                >
                  Update
                </button>
              ))}
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.userName}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
