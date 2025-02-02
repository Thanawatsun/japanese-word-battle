import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_stsyem from "../act_system";
import Sign from "./game_sign";
import Station from "./game_station";
import Ticket from "./game_ticketBooth";
import Poppu_menu from "../popup_menu";

function Game_system() {
  const [load_act, setload_act] = useState(false);
  const [life_act, setlife_act] = useState(0);
  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  const { max_count } = location.state;
  const { life } = location.state;
  useEffect(() => {
    setlife_act(life);
  }, []);
  console.log(quizData);
  const game_data = quizData[act_count].choose_path.post_practice.game;
  const handlenext = () => {
    setload_act(true);
  };

  return (
    <div>
      <div>time point left : {life_act}</div>
      <div>
        act count : {act_count[4]}/{max_count}
      </div>
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
    </div>
  );
}

export default Game_system;
