import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/quiz.css";
import SetReward from "../../../api/setReward";
import SetSaveGame from "../../../api/setSaveGame";
import PlaySound from "../../../component/PlaySound";
import Poppu_Stamp from "../popup_stamp";
import { count } from "firebase/firestore";
function Reward() {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;
  const [name, setName] = useState("test002");
  const [age, setAge] = useState("2300");
  var stamp_status = "normal";
  var stamp_image = quizData.reward.stamp;

  if (life === 5) {
    stamp_status = "trim";
    stamp_image = quizData.reward.trim_stamp;
  }
  const handlenext = async (event) => {
    PlaySound("button");
    event.preventDefault();
    const updateStamp_Data = quizData.level;
    try {
      SetReward(userdefine.uid, updateStamp_Data, stamp_status);
      SetSaveGame(userdefine.uid, null, null, null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((error) => {
        console.error("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Poppu_Stamp stamp_image={stamp_image} />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FTokyoSkytree.webp?alt=media&token=4d97e3db-c596-4067-b862-fbfe65f51b91"
            alt=""
            className="story-image"
          />
          <iframe
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/audio%2FSound%20Effect%2F250-milliseconds-of-silence.mp3?alt=media&token=0e9184ac-c977-46e3-b009-36349f905090"
            allow="autoplay"
            id="audio"
            style={{ display: "none" }}
          ></iframe>
          <audio id="player" autoPlay ref={audioRef}>
            <source
              src={
                "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/audio%2FSound%20Effect%2FWin%20Stage.mp3?alt=media&token=08c38ad1-24da-4461-9d88-292290394bf2"
              }
              type="audio/mp3"
            />
          </audio>
        </Col>
        <Col>
          <div className="reward-box">
            <div>
              <button
                className="confirm_button reward-confirm-button"
                onClick={handlenext}
                style={{ marginTop: "1vh" }}
              >
                Next
              </button>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default Reward;
