import React, { useState } from "react";
import "../css/profile.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { getDatabase, ref, update, onValue } from "firebase/database";
function Proflie({ userData }) {
    const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleClose = () => {
    setShowPopup(false);
  };
  const handleSearch = () => {
    // ทำการกรองข้อมูลตามค่าใน searchValue
    // สมมติว่าคุณมีข้อมูลที่จะกรองอยู่แล้ว และเก็บไว้ในตัวแปร data
    console.log(searchValue)
    
    const db = getDatabase(app);
    const term = userData.uid;
    const termRef = ref(db, "User_Data/" + term);
    console.log(termRef);
    update(termRef, {
      username:searchValue
    });
    setShowPopup(false);
  };
  return (
    <div className="profile">
      <div className="proflie_block_image">
        <div className="profile_image">
          <img src={userData.user_profile} alt="Paris" width="80" height="80" />
        </div>
        <div className="username">
          <h3>username</h3>
          <p>{userData.username}</p>
        </div>
        <div className="useremail">
          <h3>UserEmail</h3>
          <p>{userData.useremail}</p>
        </div>
      </div>
      <div className="proflie_block">
        <h3>Level การเรียนรู้</h3>
        <p>{userData.learning_level}</p>
      </div>
      <div className="proflie_block">
        <h3>ด่านที่ผ่าน</h3>
        <p>{userData.user_stage}</p>
      </div>
      <div className="proflie_block">
        <h3>แต้มรวม</h3>
        <p>{userData.user_score}</p>
      </div>
      <div className="proflie_block_button">
        <button onClick={() => setShowPopup(true)}>change user name</button>
        <div>
      
      {showPopup && (
        <div className="popup">
          <p>กรองชื่อที่ต้องการ</p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <br /><br />
          <button onClick={handleSearch}>ตงลง</button>
          <button onClick={handleClose}>ปิด</button>
        </div>
      )}
    </div>
      </div>
    </div>
  );
}

export default Proflie;
