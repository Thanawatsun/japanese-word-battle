import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Act_stsyem from "../act_system";
import Pronunciation from "./pronunciation";
import Word from "./word";
function Practice() {
  const [number_story, setnumber_story] = useState(1);
  const [targetText, settargetText] = useState("story_text_1");
  const [per_pratice_act, setper_pratice_act] = useState(false);
  const [post_pratice_act, setpost_pratice_act] = useState(false);
  const [load_act, setload_act] = useState(false);
  const [story_act, setstory_act] = useState(true);

  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state

  const navigate = useNavigate();

  const handlenext = () => {
    setload_act(true)
  };
  return (
    <div>
      <div>
      {load_act ?(
        <Act_stsyem Isgame={true} modiflyQuiz={quizData} />
      ):(
        <div></div>
      )}
      </div>
      <button
        className="confirm_button"
        onClick={handlenext}
        style={{ marginTop: "1vh" }}
      >
        Confirm
      </button>
    </div>
  );
}

export default Practice;
