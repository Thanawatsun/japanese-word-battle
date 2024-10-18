import "../css/home.css";
import Profile from "./profile";
import Bankword from "./bankword";
import ScoreBoard from "./scoreboard";
import Stage from "./stage";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
function Home({ userdefine }) {
  const [IsHome, setIsHome] = useState(true);
  const [Isbankword, setIsbankword] = useState(false);
  const [IsBoard, setIsBoard] = useState(false);
  const [IsProflie, setIsProflie] = useState(false);
  const [userData, setUserData] = useState({})
  useEffect(()=>{
    try {
      const databaseRef = ref(getDatabase(app), `User_Data/` + userdefine.uid);
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data)
      });
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  },[])
  function changePage(page){
    console.log(userdefine)
    if(page === "Home"){
      setIsHome(true)
      setIsbankword(false)
      setIsBoard(false)
      setIsProflie(false)
    }
    else if(page === "Bankword"){
      setIsHome(false)
      setIsbankword(true)
      setIsBoard(false)
      setIsProflie(false)
    }
    else if(page === "Board"){
      setIsHome(false)
      setIsbankword(false)
      setIsBoard(true)
      setIsProflie(false)
    }
    else if(page === "Proflie"){
      setIsHome(false)
      setIsbankword(false)
      setIsBoard(false)
      setIsProflie(true)
    }
  }
  return (
    <div>
      <div className="mainbox">
        {IsHome ? (
          <div>
          <Stage/>
          </div>
        ) : Isbankword ? (
          <div>
            <Bankword/>
          </div>
        ) : IsBoard ? (
          <div>
            <ScoreBoard userData={userData}/>
          </div>
        ) : IsProflie ? (
          <div>
            <Profile userData={userData}/>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="mainContainer">
      <button onClick={() => changePage("Home")}> Home</button>
      <button onClick={() => changePage("Bankword")}> Bankword</button>
      <button onClick={() => changePage("Board")}> Board</button>
      <button onClick={() => changePage("Proflie")}> Proflie</button>
      </div>
    </div>
  );
}
export default Home;
