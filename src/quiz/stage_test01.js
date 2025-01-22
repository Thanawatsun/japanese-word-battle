import React, { useState } from "react";
import "../css/quiz.css";
import { useEffect } from "react";
import Act_stsyem from "./act/act_system";
import { app } from "../firebase"; // Import your Firebase configuration
import { getDatabase, ref,onValue } from "firebase/database";
function Stage_stsyem({ setIsPlayer, modiflyQuiz, userdefine, stageplay }) {
  var continuePlay = false
  var continueGame = {};

  return (
    <div>
      <div className="quiz_container">
        <div className="action_block">
          <Act_stsyem
            modiflyQuiz={modiflyQuiz[stageplay]}
            Ispractice={false}
            Isstory={true}
            userdefine={userdefine}
            act_count={"act_1"}
            life={5}
            continuePlay={continuePlay}
            continueGame={continueGame}
          />
        </div>
      </div>
    </div>
  );
}
export default Stage_stsyem;
