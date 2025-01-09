import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_stsyem from "../act_system";

import Sign from "./game_sign";
import Station from "./game_station";
import Ticket from "./game_ticketBooth";

function Game_system() {
  const [load_act, setload_act] = useState(false);

  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const {rawData} = location.state;
  console.log(quizData);
  const game_data = quizData.choose_path.post_practice.game
  const handlenext = () => {
    setload_act(true);
  };
  return (
    <div>
      <div>
        {load_act ? (
          <Act_stsyem Isstory_post_game={true} modiflyQuiz={quizData} rawData={rawData}/>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <div>
          {game_data.type === "sign" ? (
            <Sign game_data={game_data} setload_act={setload_act}/>
          ): game_data.type === "station" ? (
            <Station game_data={game_data} setload_act={setload_act}/>
          ) : game_data.type === "ticket" ? (
            <Ticket game_data={game_data} setload_act={setload_act}/>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game_system;
