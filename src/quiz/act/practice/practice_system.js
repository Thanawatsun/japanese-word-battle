import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_system from "../act_system";
import Pronunciation from "./pronunciation";
import Word from "./word";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Poppu_menu from "../popup_menu";
import Popup_gameover from "../popup_gameover";

function Practice() {
  const [load_act, setload_act] = useState(false);
  const [gameover_act, setgameover_act] = useState(false);
  const [life_act, setlife_act] = useState(5);
  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;
  const practice_list = quizData[act_count].practice;
  const practice_type = "pronunciation_set"; //อิงตาม data ที่ได้มา
  const navigate = useNavigate();
  const location_point = [];

  useEffect(() => {
    setlife_act(life);
  }, []);
  useEffect(() => {
    if (life_act <= 0) {
      console.log("popup start");
      setgameover_act(true);
    }
  }, [life_act]);
  const handlenext = () => {
    setload_act(true);
  };
  for (let i = 0; i < max_count + 1; i++) {
    location_point.push(
      <div
        key={i}
        className="ipad-circle"
        style={{ top: `${(i * 100) / max_count}%` }}
      >
        {i < act_count[4] ? (
          <div
            className="ipad-inner-circle"
            style={{ backgroundColor: "#68E758" }}
          ></div>
        ) : (
          <div
            className="ipad-inner-circle"
            style={{ backgroundColor: "#9D9D9D" }}
          ></div>
        )}
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="time-box">
            <div className="clock-frame">
              <div className="clock-text">
                <h4>Time Left</h4>
                <h1>0{life_act}:00</h1>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <Poppu_menu
            modiflyQuiz={quizData}
            act_count={act_count}
            userdefine={userdefine}
            life={life_act}
          />
          {load_act ? (
            <Act_system
              Isgame={true}
              modiflyQuiz={quizData}
              act_count={act_count}
              userdefine={userdefine}
              life={life_act}
            />
          ) : gameover_act ? (
            <Popup_gameover
              modiflyQuiz={quizData}
              act_count={act_count}
              userdefine={userdefine}
              life={life_act}
            />
          ) : (
            <div></div>
          )}
          {practice_type === "pronunciation_set" ? (
            <Pronunciation_set
              game_data={practice_list}
              setload_act={setload_act}
              life_act={life_act}
              setlife_act={setlife_act}
            />
          ) : practice_type === "01" ? (
            <Pronunciation_set
              game_data={practice_list}
              setload_act={setload_act}
            />
          ) : practice_type === "02" ? (
            <Pronunciation_set
              game_data={practice_list}
              setload_act={setload_act}
            />
          ) : (
            <div></div>
          )}
        </Col>
        <Col>
          <div className="act-box">
            <div className="ipad-border">
              <div className="ipad-screen">
                <div className="ipad-display">
                  {location_point}
                  <div
                    className="ipad-display-progression"
                    style={{
                      height: `${((act_count[4] - 1) * 100) / max_count}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="ipad-button"></div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function Pronunciation_set({ game_data, setload_act, setlife_act, life_act }) {
  const [practice_1, setpractice_1] = useState(true);
  const [practice_2, setpractice_2] = useState(false);
  const [practice_3, setpractice_3] = useState(false);
  console.log(game_data);
  return (
    <div>
      {practice_1 ? (
        <Pronunciation
          this_stage={setpractice_1}
          next_stage={setpractice_2}
          game_data={game_data.pronunciation[0]}
          life_act={life_act}
          setlife_act={setlife_act}
        />
      ) : practice_2 ? (
        <Word
          this_stage={setpractice_2}
          next_stage={setpractice_3}
          game_data={game_data.word[0]}
          life_act={life_act}
          setlife_act={setlife_act}
        />
      ) : practice_3 ? (
        <Word
          this_stage={setpractice_3}
          next_stage={setload_act}
          game_data={game_data.word[1]}
          life_act={life_act}
          setlife_act={setlife_act}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Practice;
