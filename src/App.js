//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import LoginUser from "./page/login";
import LogoutUser from "./page/logout";
import Home from "./page/Home";
import Multi from "./multitest";
import MultiChoice from "./component/MultiChoice";
import CorrectWordChoice from "./component/CorrectWordChoice";
import MissingWordChoice from "./component/MissingWordChoice";
import Matching from "./component/Matching";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);
  const [allScore, setAllScore] = useState(0);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLogin ? (
        <div className="App">
          <LogoutUser setIsLogin={setIsLogin} />
          <Home/>
        </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
