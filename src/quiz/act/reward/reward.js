import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/quiz.css";
import { app } from "../../../firebase"; // Import your Firebase configuration
import { getDatabase, ref, update } from "firebase/database";
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
    event.preventDefault();
    const updateStamp_Data =quizData.level
    var stamp_status = "normal"
    if(life === 5){
      stamp_status = "trim"
    }
    
    try {
      const response = await axios.post(
        `http://localhost:9000/postuser/${userdefine.uid}/Stamp_Data/${updateStamp_Data}`,
        {
          Stamp:stamp_status
        }
      );
      
            // update act to user
            const db = getDatabase(app);
            const term = userdefine.uid;
            const termRef = ref(db, "User_Data/" + term);
            console.log(act_count);
            update(termRef, {
              stage_playing_name: null,
              stage_playing_act: null,
            });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div className="reward-box">
            <div>
              <div>Reward</div>
              <button
                className="confirm_button"
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
