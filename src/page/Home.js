import "../css/home.css";
import Profile from "./profile";
import Bankword from "./bankword";
import ScoreBoard from "./scoreboard";
import Stage from "./stage";
import React, { useEffect, useState } from "react";
function Home() {
  const [IsHome, setIsHome] = useState(true);
  const [Isbankword, setIsbankword] = useState(false);
  const [IsBoard, setIsBoard] = useState(false);
  const [IsProflie, setIsProflie] = useState(false);

  function changePage(page){
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
            <ScoreBoard/>
          </div>
        ) : IsProflie ? (
          <div>
            <Profile/>
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
