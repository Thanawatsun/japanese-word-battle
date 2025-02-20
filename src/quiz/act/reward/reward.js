import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/quiz.css";
import SetReward from "../../../api/setReward";
import PlaySound from "../../../component/PlaySound";

function Reward() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;
  const [name, setName] = useState("test002");
  const [age, setAge] = useState("2300");
  const handlenext = async (event) => {
    PlaySound("button");
    event.preventDefault();
    const updateStamp_Data = quizData.level;
    var stamp_status = "normal";
    if (life === 5) {
      stamp_status = "trim";
    }
    try {
      SetReward(userdefine.uid, updateStamp_Data, stamp_status);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    PlaySound("stagewin");
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FTokyoSkytree.webp?alt=media&token=4d97e3db-c596-4067-b862-fbfe65f51b91"
            alt=""
            className="story-image"
          />
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
