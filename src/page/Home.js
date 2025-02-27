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
import PlaySound from "../component/PlaySound";

function Home({
  userdefine,
  setIsPlayer,
  setModiflyQuiz,
  setStageplay,
  setIsLogin,
  setuserdefine,
  scoreboardData,
  stampData,
  modiflyQuiz,
}) {
  const [IsHome, setIsHome] = useState(true);
  const [IsStamp, setIsStamp] = useState(false);
  const [IsBoard, setIsBoard] = useState(false);
  const [IsProflie, setIsProflie] = useState(false);
  const [userData, setUserData] = useState({});
  const imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FMain%20Menu%20Background.jpg?alt=media&token=bd28a35f-97a2-4c3b-89b2-291259fe92c3',
    'https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FJapanCity.jpg?alt=media&token=58f00afc-2cd9-47a2-86d7-cf9a1529f076',
    'https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FTicketMachine.webp?alt=media&token=27b150b1-5874-4e70-84eb-a4eadc18e7d8',
    // เพิ่ม URL รูปภาพอื่นๆ ตามต้องการ
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrls[0]);
  const [nextImageUrl, setNextImageUrl] = useState(imageUrls[1] || imageUrls[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setCurrentImageUrl(nextImageUrl);
      setNextImageUrl(imageUrls[(currentImageIndex + 2) % imageUrls.length]);
      setIsTransitioning(false);
    }, 10000);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, imageUrls,changeImage]);
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
  }, [userdefine.uid]);
  function changePage(page) {
    console.log(userdefine);
    if (page === "Home") {
      // buttonSound.play();
      PlaySound("button");
      setIsHome(true);
      setIsStamp(false);
      setIsBoard(false);
      setIsProflie(false);
    } else if (page === "Stamp") {
      // buttonSound.play();
      PlaySound("button");
      setIsHome(false);
      setIsStamp(true);
      setIsBoard(false);
      setIsProflie(false);
    } else if (page === "Board") {
      // buttonSound.play();
      PlaySound("button");
      setIsHome(false);
      setIsStamp(false);
      setIsBoard(true);
      setIsProflie(false);
    } else if (page === "Proflie") {
      // buttonSound.play();
      PlaySound("button");
      setIsHome(false);
      setIsStamp(false);
      setIsBoard(false);
      setIsProflie(true);
    }
  }
  return (
    <div
    className={`main-container-box ${isTransitioning ? 'transitioning' : ''}`}
    style={{
      backgroundImage: `url(${currentImageUrl})`,
    }}>
      <Container>
        <Row>
          <Col>
            <div className="mainContainer">
              <button
                className="change-page-button"
                onClick={() => changePage("Home")}
              >
                <h2>Trip</h2>
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
                  modiflyQuiz={modiflyQuiz}
                />
              </div>
            ) : IsStamp ? (
              <div className="center-content">
                <Stamp stamplist={userData.Stamp_Data} stampData={stampData} />
              </div>
            ) : IsBoard ? (
              <div className="center-content">
                <ScoreBoard
                  userData={userData}
                  scoreboardData={scoreboardData}
                />
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
