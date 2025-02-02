import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_stsyem from "../act_system";
import Pronunciation from "./pronunciation";
import Word from "./word";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Poppu_menu from "../popup_menu";
function Practice() {
  const [load_act, setload_act] = useState(false);
  const [life_act, setlife_act] = useState(0);
  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;

  const practice_list = quizData[act_count].practice;
  const practice_type = "pronunciation_set"; //อิงตาม data ที่ได้มา
  const navigate = useNavigate();
  useEffect(() => {
    setlife_act(life);
  }, []);
  const handlenext = () => {
    setload_act(true);
  };
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h4>Time Left</h4>
          </div>
          <div>
            <h1>0{life_act}:00</h1>
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
            <Act_stsyem
              Isgame={true}
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
          act count : {act_count[4]}/{max_count}
        </Col>
      </Row>
    </Container>
  );
}

function Pronunciation_set({ game_data, setload_act }) {
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
        />
      ) : practice_2 ? (
        <Word
          this_stage={setpractice_2}
          next_stage={setpractice_3}
          game_data={game_data.word[0]}
        />
      ) : practice_3 ? (
        <Word
          this_stage={setpractice_3}
          next_stage={setload_act}
          game_data={game_data.word[1]}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Practice;
