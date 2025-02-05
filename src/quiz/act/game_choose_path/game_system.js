import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_stsyem from "../act_system";
import Sign from "./game_sign";
import Station from "./game_station";
import Ticket from "./game_ticketBooth";
import Poppu_menu from "../popup_menu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Game_system() {
  const [load_act, setload_act] = useState(false);
  const [life_act, setlife_act] = useState(0);
  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;
  const location_point = [];

  useEffect(() => {
    setlife_act(life);
  }, []);
  console.log(quizData);
  const game_data = quizData[act_count].choose_path.post_practice.game;
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
          <div>
            <h4>Time Left</h4>
          </div>
          <div>
            <h1>0{life_act}:00</h1>
          </div>
        </Col>
        <Col>
          <div>
            <Poppu_menu
              modiflyQuiz={quizData}
              act_count={act_count}
              userdefine={userdefine}
              life={life_act}
            />
            {load_act ? (
              <Act_stsyem
                Isnext={true}
                modiflyQuiz={quizData}
                act_count={act_count}
                userdefine={userdefine}
                life={life_act}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <div>
              {game_data.type === "sign" ? (
                <Sign game_data={game_data} setload_act={setload_act} />
              ) : game_data.type === "station" ? (
                <Station game_data={game_data} setload_act={setload_act} />
              ) : game_data.type === "ticket" ? (
                <Ticket game_data={game_data} setload_act={setload_act} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
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

export default Game_system;
