import React, { useEffect, useState } from "react";
import "../../css/quiz.css";

import { useNavigate } from "react-router-dom";

function Act_stsyem({
  modiflyQuiz,
  Ispractice,
  Isstory,
  Isgame,
  Isstory_post_game,
  Isnext,
  Isreward,
  act_count,
  userdefine,
  life,
}) {
  console.log(life);
  const { quizData } = modiflyQuiz;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(modiflyQuiz[act_count].nectAct);
    if ((modiflyQuiz[act_count].nextAct === "act_end") & Isnext) {
      alert("end");
      navigate("/reward", {
        state: {
          quizData: modiflyQuiz,
          act_count: act_count,
          userdefine: userdefine,
          life:life,
          max_count:modiflyQuiz.act_count
        },
      });
      //เดี๋ยวมาใส่ด่าน rewar
    } else {
      if (Isnext) {
        act_count = modiflyQuiz[act_count].nextAct;
        Isstory_post_game = false;
        Isstory = true;
      }
      if (act_count > modiflyQuiz.act_count) {
        console.log("end game");
      }
      if (Isstory_post_game === true) {
        navigate("/story_endact", {
          state: {
            quizData: modiflyQuiz,
            poststory: true,
            act_count: act_count,
            userdefine: userdefine,
            life:life,
            max_count:modiflyQuiz.act_count
          },
        });
      }
      if (Isgame === true) {
        navigate("/game", {
          state: {
            quizData: modiflyQuiz,
            act_count: act_count,
            userdefine: userdefine,
            life:life,
            max_count:modiflyQuiz.act_count
          },
        });
      }
      if (Ispractice === true) {
        navigate("/practice", {
          state: {
            quizData: modiflyQuiz,
            act_count: act_count,
            userdefine: userdefine,
            life:life,
            max_count:modiflyQuiz.act_count
          },
        });
      }
      if (Isstory === true) {
        navigate("/story", {
          state: {
            quizData: modiflyQuiz,
            poststory: false,
            act_count: act_count,
            userdefine: userdefine,
            life:life,
            max_count:modiflyQuiz.act_count
          },
        }); // ส่งค่า quizData ผ่าน state
      }
    }
  }, [Ispractice, Isstory]);
  return <div></div>;
}
export default Act_stsyem;
