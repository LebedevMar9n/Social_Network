import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Cover from "../../img/defaultCover.png";
import Profile from "../../img/defaultProfile.png";
import "./ProfileCard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.postReducer);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture ? user.coverPicture : Cover} alt="coverPicture" />
        <img src={user.profilePicture ? user.profilePicture : Profile} alt="profilePicture" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage'
        ? ("")
        : (<span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>)}
    </div>
  );
};

export { ProfileCard };