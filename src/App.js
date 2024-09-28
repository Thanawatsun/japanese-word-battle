//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import LoginUser from "./page/login";
import LogoutUser from "./page/logout";

function App() {
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLogin ? (
        <div className="App">
          <LogoutUser setIsLogin={setIsLogin} />
          <header className="App-header"></header>
        </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
