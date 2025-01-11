//import logo from './logo.svg';
import "./App.css";
import LoginUser from "./page/login";
import LogoutUser from "./page/logout";
import Home from "./page/Home";
import Stage_stsyem from "./quiz/stage_test01";
import Quiz from "./quiz/quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [modiflyQuiz, setModiflyQuiz] = useState({});
  const [userdefine, setuserdefine] = useState({});
  const [stageplay, setStageplay] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/testAPI")
      .then((response) => {
        setData(response.data);
        setModiflyQuiz(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <Home
                    userdefine={userdefine}
                    setIsPlayer={setIsPlayer}
                    setModiflyQuiz={setModiflyQuiz}
                    setStageplay={setStageplay}
                  />
                </Col>
                <Col>
                  <LogoutUser
                    setIsLogin={setIsLogin}
                    setuserdefine={setuserdefine}
                  />
                </Col>
              </Row>
            </Container>
          )}
        </div>
      ) : (
        <LoginUser setIsLogin={setIsLogin} setuserdefine={setuserdefine} />
      )}
    </div>
  );
}

export default App;
