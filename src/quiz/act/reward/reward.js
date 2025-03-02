import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/quiz.css";
import SetReward from "../../../api/setReward";
import GetReward from "../../../api/getProfile";
import SetSaveGame from "../../../api/setSaveGame";
import PlaySound from "../../../component/PlaySound";
import PoppuStamp from "../popup_stamp";

function Reward() {
  const [dataStamp, setDataStamp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { quizData } = location.state; // รับค่า quizData จาก state
  //const { act_count } = location.state;
  const { userdefine } = location.state;
  //const { max_count } = location.state;
  //const { life } = location.state;
  //GetReward(setshowPopup,userdefine.uid)
  var stamp_status = "trim";
  var stamp_image = quizData.reward.trim_stamp;

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
    GetReward(setDataStamp, userdefine.uid);
  }, [userdefine, quizData]);
  useEffect(() => {
    if (
      dataStamp !== false &&
      dataStamp.Stamp_Data &&
      dataStamp.Stamp_Data[quizData.level] !== undefined
    ) {
      if (stamp_status === dataStamp.Stamp_Data[quizData.level].Stamp) {
        setShowPopup(false);
      } else if (
        stamp_status === "trim" &&
        dataStamp.Stamp_Data[quizData.level].Stamp === "normal"
      ) {
        setShowPopup(true);
      } else if (
        stamp_status === "normal" &&
        dataStamp.Stamp_Data[quizData.level].Stamp === "trim"
      ) {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    } else {
      setShowPopup(true);
    }
  }, [dataStamp, quizData, stamp_status]);
  /*
  if(showPopup.Stamp_Data !== undefined && showPopup.Stamp_Data[quizData.level]!== undefined){
    console.log(showPopup.Stamp_Data)
  }*/

  return (
    <Container>
      <Row>
        <Col>
          {showPopup ? <PoppuStamp stamp_image={stamp_image} /> : <div></div>}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fbook%20background.jpg?alt=media&token=9731054e-6892-4980-8379-4ec86ee88b1d"
            alt="Book Background"
            className="story-image"
          />
          <p className="gallery">
            <img
              className="gallery-image"
              src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FStage%201%2FTokyoSkytree_1.webp?alt=media&token=52c63b62-ee99-40ea-b04c-ba18f66f5c52"
              alt="galleryimage"
            />
            <img
              className="gallery-image"
              src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FStage%201%2FTokyoSkytree_2.png?alt=media&token=ab58ceb6-39be-4b5b-9459-9841771cdabc"
              alt="galleryimage"
            />
            <img
              className="gallery-image"
              src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FStage%201%2FTokyoSkytree_3.webp?alt=media&token=5941e546-90ef-4b35-b864-07e26868b7be"
              alt="galleryimage"
            />
            <img
              className="gallery-image"
              src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FStage%201%2FTokyoSkytree_4.webp?alt=media&token=7ba5af6f-7a27-4d0a-aaae-4e7dc28231b2"
              alt="galleryimage"
            />
          </p>
          <iframe
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/audio%2FSound%20Effect%2F250-milliseconds-of-silence.mp3?alt=media&token=0e9184ac-c977-46e3-b009-36349f905090"
            allow="autoplay"
            id="audio"
            title="silence"
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
                End trip
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
