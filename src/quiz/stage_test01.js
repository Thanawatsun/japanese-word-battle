import React, { useState } from "react";
import "../css/quiz.css";
import {useEffect} from "react";
import Act_stsyem from "./act/act_stsyem";

function Stage_stsyem({
  setIsPlayer,
  modiflyQuiz,
  userdefine,
  stageplay
}) {


  const [Score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [combo, setCombo] = useState(1);
  const [life, setLife] = useState(99);

  const [storyAct, setStoryAct] = useState(true);
  const [storyAct_end, setStoryAct_end] = useState(false);
  const [rewardAct, setRewardAct] = useState(false);
console.log(modiflyQuiz)
console.log(stageplay)
  useEffect(() =>{
    if(life ===0){
      alert("you dead")
      window.location.reload();
    }
    
  },[life])
  return (
    <div>
      <div className="quiz_container">
        <div className="action_block">
        <Act_stsyem modiflyQuiz={modiflyQuiz[stageplay]}/>
        </div>
      </div>
    </div>
  );
}
export default Stage_stsyem;
