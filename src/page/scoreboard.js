import "../css/scoreboard.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
function ScoreBoard({userData}) {
    const [users, setUsers] = useState([]);
    const [sortusers, setSortusers] = useState([]);
    const [userrank, setUserrank] = useState(1);
    useEffect(() => {
      const dbRef = ref(getDatabase(app), `User_Data/`);
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        
        const usersArray = [];
        for (const userId in userData) {
          usersArray.push({
            id: userId,
            ...userData[userId]
          });
        }
      const sortedUsers = usersArray.sort((a, b) => b.user_score - a.user_score);

      const top10Users = sortedUsers.slice(0, 10);
      setSortusers(sortedUsers)
      setUsers(top10Users);
      });
    }, []);
    useEffect(() => {
        if(sortusers != null){
            for (const userId in sortusers) {
            if(sortusers[userId].id === userData.uid){
                setUserrank(parseInt(userId)+1)
            }
          }
        }
        
    },[users])
    return(
        <div className="scoreBoard">
      <table className="scoreBoard_table">
        <thead>
          <tr>
            <th>อันดับ</th>
            <th>ภาพ</th>
            <th>ชื่อ</th>
            <th>คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td><img src={user.user_profile} alt="Proflie" width="50" height="50"/></td>
              <td>{user.username}</td>
              <td>{user.user_score}</td>
            </tr>
          ))}
        </tbody>
        
        <tbody>
        <hr className="line"/>
        <tr>
          <td>
            {userrank}</td>
          <td>
            <img src={userData.user_profile} alt="Proflie" width="60" height="60"/></td>
          <td>
            {userData.username}</td>
          <td>
            {userData.user_score}</td>
          </tr>
        </tbody>
      </table>
    </div>
    )
}

export default ScoreBoard;