import React, { useState } from "react";
import "../css/profile.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { getDatabase, ref, update } from "firebase/database";
import PlaySound from "../component/PlaySound";

function Proflie({ userData }) {
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => {
    PlaySound("button");
    setShowPopup(false);
  };
  const handleSearch = () => {
    PlaySound("button");

    const db = getDatabase(app);
    const term = userData.uid;
    const termRef = ref(db, "User_Data/" + term);
    console.log(termRef);
    update(termRef, {
      username: searchValue,
    });
    setShowPopup(false);
  };

  return (
    <div className="profile">
      <div className="proflie_block_image">
        <div className="profile_image">
          <img
            src={userData.user_profile}
            alt="Profile"
            width="100"
            height="100"
            className="user-image"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="username">
          <h3 className="profile-side-head-text">User Name</h3>
          <p className="profile-side-par-text">{userData.username}</p>
        </div>
        <div className="useremail">
          <h3 className="profile-side-head-text">Email</h3>
          <p className="profile-side-par-text">{userData.useremail}</p>
        </div>
      </div>

      {/*<div className="proflie_block">
        <h3>Level การเรียนรู้</h3>
        <p>{userData.learning_level}</p>
      </div>*/}
      <div className="proflie_block">
        <h3 className="profile-thai profile-head-text">ด่านที่ผ่าน</h3>
        <p className="profile-par-text">{userData.user_stage}</p>
      </div>
      <div className="proflie_block">
        <h3 className="profile-thai profile-head-text">แสตมป์ทั้งหมด</h3>
        <p className="profile-par-text">{userData.user_score}</p>
      </div>
      <div className="proflie_block_button">
        <button
          className="change-name-button"
          onClick={() => {
            PlaySound("button");
            setShowPopup(true);
          }}
        >
          <h5>CHANGE USER NAME</h5>
        </button>
      </div>
      <div>
        {showPopup && (
          <>
            <div className="popup-box"></div>
            <div className="popup">
              <div className="popup-top">
                <input
                  className="popup-text-input"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <h4 className="profile-thai">กรองชื่อที่ต้องการ</h4>
              </div>
              <button className="confirm-button" onClick={handleSearch}>
                <h5 className="profile-thai">ตกลง</h5>
              </button>
              <button className="cancel-button" onClick={handleClose}>
                <h5 className="profile-thai">ยกเลิก</h5>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Proflie;
