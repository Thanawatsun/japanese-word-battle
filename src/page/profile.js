import "../css/profile.css";
function Proflie({userData}) {
    return(
        <div className="profile">
            <div className="proflie_block_image">
                <div className="profile_image">
                <img src={userData.user_profile} alt="Paris" width="80" height="80"/>
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
                <button>change user name</button>
            </div>
        </div>
    )
}

export default Proflie;