import logo from './logo.svg';
import './App.css';
import React, {useState,useContext } from 'react';
import LoginUser from './page/login';
import LogoutUser from './page/logout';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLogin ? (
        <div className="App">
          <LogoutUser setIsLogin={setIsLogin}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            Test I'm in???
          </p>
          <img src="https://pbs.twimg.com/media/GO5URDWaEAA9CdC?format=jpg&name=large" alt="" />
          <h1>Rosmontis is kawaii!!!!</h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} />
      )}

    </div>
  );
}

export default App;
