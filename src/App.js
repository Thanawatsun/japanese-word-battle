//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import LoginUser from "./page/login";
import LogoutUser from "./page/logout";
import Home from "./page/Home";
import Quiz from "./quiz/quiz";
import Multi from "./multitest";
import MultiChoice from "./component/MultiChoice";
import CorrectWordChoice from "./component/CorrectWordChoice";
import MissingWordChoice from "./component/MissingWordChoice";
import Matching from "./component/Matching";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [allScore, setAllScore] = useState(0);
  const [modiflyQuiz, setModiflyQuiz] = useState({});
  const [userdefine, setuserdefine] = useState({});
  return (
    <div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isLogin ? (
        <div className="App">
          {isPlayer ? (
            <div>
              <Quiz setIsPlayer={setIsPlayer} modiflyQuiz={modiflyQuiz} userdefine={userdefine}/>
            </div>
          ) : (
            <div>
              <LogoutUser
                setIsLogin={setIsLogin}
                setuserdefine={setuserdefine}
              />
              <Home userdefine={userdefine} setIsPlayer={setIsPlayer} setModiflyQuiz={setModiflyQuiz}/>
            </div>
          )}
        </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} setuserdefine={setuserdefine} />
      )}

    </div>
  );
}

export default App;
