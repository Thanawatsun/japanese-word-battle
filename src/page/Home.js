import "../css/home.css";
import Profile from "./profile";
import Stamp from "./stamp";
import ScoreBoard from "./scoreboard";
import Stage from "./stage";
import LogoutUser from "./logout";
import { app } from "../firebase";
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home({
  userdefine,
  setIsPlayer,
  setModiflyQuiz,
  setStageplay,
  setIsLogin,
  setuserdefine,
}) {
  const [IsHome, setIsHome] = useState(true);
  const [IsStamp, setIsStamp] = useState(false);
  const [IsBoard, setIsBoard] = useState(false);
  const [IsProflie, setIsProflie] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    try {
      const databaseRef = ref(getDatabase(app), `User_Data/` + userdefine.uid);
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  }, []);
  function changePage(page) {
    console.log(userdefine);
    if (page === "Home") {
      setIsHome(true);
      setIsStamp(false);
      setIsBoard(false);
      setIsProflie(false);
    } else if (page === "Stamp") {
      setIsHome(false);
      setIsStamp(true);
      setIsBoard(false);
      setIsProflie(false);
    } else if (page === "Board") {
      setIsHome(false);
      setIsStamp(false);
      setIsBoard(true);
      setIsProflie(false);
    } else if (page === "Proflie") {
      setIsHome(false);
      setIsStamp(false);
      setIsBoard(false);
      setIsProflie(true);
    }
  }
  return (
    <div className="main-container-box">
      <Container>
        <Row>
          <Col>
            <div className="mainContainer">
              <button
                className="change-page-button"
                onClick={() => changePage("Home")}
              >
                <h2>Map</h2>
              </button>
              <button
                className="change-page-button"
                onClick={() => changePage("Stamp")}
              >
                <h2>Stamp</h2>
              </button>
              <button
                className="change-page-button"
                onClick={() => changePage("Board")}
              >
                <h2>Scoreboard</h2>
              </button>
              <button
                className="change-page-button"
                onClick={() => changePage("Proflie")}
              >
                <h2>Proflie</h2>
              </button>
              <button className="change-page-button logout-button">
                <LogoutUser
                  setIsLogin={setIsLogin}
                  setuserdefine={setuserdefine}
                />
              </button>
            </div>
          </Col>
          <Col className="mainbox">
            {IsHome ? (
              <div className="center-content">
                <Stage
                  setIsPlayer={setIsPlayer}
                  userData={userData}
                  setModiflyQuiz={setModiflyQuiz}
                  setStageplay={setStageplay}
                />
              </div>
            ) : IsStamp ? (
              <div className="center-content">
                <Stamp stamplist={userData.Stamp_Data} />
              </div>
            ) : IsBoard ? (
              <div className="center-content">
                <ScoreBoard userData={userData} />
              </div>
            ) : IsProflie ? (
              <div className="center-content">
                <Profile userData={userData} />
              </div>
            ) : (
              <div></div>
            )}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
