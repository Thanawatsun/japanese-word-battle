//import logo from './logo.svg';
import "./App.css";
import LoginUser from "./page/login";
import Home from "./page/Home";
import Stage_stsyem from "./quiz/stage_test01";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import GetStagedata from "./api/getStage"
import GetStampdata from "./api/getStamp"
import GetScoreBoarddata from "./api/getScoreBoard"
import GetProfiledata from "./api/getProfile"

function App() {
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [modiflyQuiz, setModiflyQuiz] = useState({});
  const [userdefine, setuserdefine] = useState({});
  const [stageplay, setStageplay] = useState();
  const [scoreboardData, setScoreboardData] = useState();
  const [profileData, setProfileData] = useState();
  const [stampData, setStampData] = useState();
  useEffect(() => {
    if(userdefine != {}){
      console.log("in")
    GetStagedata(setModiflyQuiz)
    GetStampdata(setStampData)
    GetScoreBoarddata(setScoreboardData)
    GetProfiledata(setProfileData,userdefine.uid)
    }
    
    console.log(userdefine)
  }, [userdefine]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLogin ? (
        <div className="App">
          {isPlayer ? (
            <div>
              <Stage_stsyem
                setIsPlayer={setIsPlayer}
                modiflyQuiz={modiflyQuiz}
                userdefine={userdefine}
                stageplay={stageplay}
              />
            </div>
          ) : (
            <Home
              userdefine={userdefine}
              setIsPlayer={setIsPlayer}
              setModiflyQuiz={setModiflyQuiz}
              setStageplay={setStageplay}
              setIsLogin={setIsLogin}
              setuserdefine={setuserdefine}
              scoreboardData={scoreboardData}
              profileData={profileData}
              stampData={stampData}
              modiflyQuiz={modiflyQuiz}
            />
          )}
        </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} setuserdefine={setuserdefine} />
      )}
    </div>
  );
}

export default App;
