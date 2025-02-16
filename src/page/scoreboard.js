import "../css/scoreboard.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
function ScoreBoard({ userData }) {
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
          ...userData[userId],
        });
      }
      const sortedUsers = usersArray.sort(
        (a, b) => b.user_score - a.user_score
      );

      const top10Users = sortedUsers.slice(0, 10);
      setSortusers(sortedUsers);
      setUsers(top10Users);
    });
  }, []);
  useEffect(() => {
    if (sortusers != null) {
      for (const userId in sortusers) {
        if (sortusers[userId].id === userData.uid) {
          setUserrank(parseInt(userId) + 1);
        }
      }
    }
  }, [users]);
  return (
    <div className="scoreBoard">
      <div className="score-board-box">
        <table className="scoreBoard_table">
          <thead className="score-board-head">
            <tr>
              <th>อันดับ</th>
              <th>ภาพ</th>
              <th>ชื่อ</th>
              <th>แสตมป์</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="score-board-contain" key={user.id}>
                <td className="table-contain-1">{index + 1}</td>
                <td className="table-contain-2">
                  <img
                    src={user.user_profile}
                    alt="Proflie"
                    width="50px"
                    height="50px"
                    className="user-image"
                  />
                </td>
                <td className="table-contain-3">{user.username}</td>
                <td className="table-contain-4">: {user.user_score} Stamp</td>
              </tr>
            ))}
          </tbody>

          {/* <tbody className="score-board-player">
          <tr>
            <td>{userrank}</td>
            <td>
              <img
                src={userData.user_profile}
                alt="Proflie"
                width="50"
                height="50"
              />
            </td>
            <td>{userData.username}</td>
            <td>{userData.user_score}</td>
          </tr>
        </tbody> */}
        </table>
      </div>
      <hr className="line" />
      <div className="player-score-box">
        <table className="scoreBoard_table">
          <thead className="score-board-head">
            <tr>
              <th>อันดับ</th>
              <th>ภาพ</th>
              <th>ชื่อ</th>
              <th>แสตมป์</th>
            </tr>
          </thead>
          <tbody>
            <tr className="score-board-contain">
              <td className="player-table-contain-1">{userrank}</td>
              <td className="player-table-contain-2">
                <img
                  src={userData.user_profile}
                  alt="Proflie"
                  width="50"
                  height="50"
                  className="user-image"
                />
              </td>
              <td className="player-table-contain-3">{userData.username}</td>
              <td className="player-table-contain-4">
                : {userData.user_score} Stamp
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreBoard;
