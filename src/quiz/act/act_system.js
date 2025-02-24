import React, { useEffect } from "react";

import "../../css/quiz.css";

import { useNavigate } from "react-router-dom";

function Act_system({
  modiflyQuiz,

  Ispractice,

  Isstory,

  Isgame,

  Isnext,

  act_count,

  userdefine,

  life,

  continueGame,

  continuePlay,

  IsQuit,

  Isloading,

  loading_type,
}) {
  //  console.log(continuePlay)

  const navigate = useNavigate();

  useEffect(() => {
    if ((modiflyQuiz[act_count].nextAct === "act_end") & Isnext) {
      navigate("/reward", {
        state: {
          quizData: modiflyQuiz,

          act_count: act_count,

          userdefine: userdefine,

          life: life,

          max_count: modiflyQuiz.act_count,
        },
      }); //เดี๋ยวมาใส่ด่าน rewar
    } else {
      if (Isnext) {
        act_count = modiflyQuiz[act_count].nextAct;

        Isstory = true;
      }

      if (Isloading) {
        navigate("/loading", {
          state: {
            quizData: modiflyQuiz,

            act_count: act_count,

            userdefine: userdefine,

            life: life,

            max_count: modiflyQuiz.act_count,

            loading_type: loading_type,
          },
        });
      }

      if (IsQuit) {
        navigate("/");
      }

      if (act_count > modiflyQuiz.act_count) {
        console.log("end game");
      }

      if (continuePlay) {
        console.log(act_count);

        act_count = continueGame.stage_playing_act;

        console.log(continueGame);

        console.log(act_count);
      }

      if (Isgame === true) {
        navigate("/game", {
          state: {
            quizData: modiflyQuiz,

            act_count: act_count,

            userdefine: userdefine,

            life: life,

            max_count: modiflyQuiz.act_count,
          },
        });
      }

      if (Ispractice === true) {
        navigate("/practice", {
          state: {
            quizData: modiflyQuiz,

            act_count: act_count,

            userdefine: userdefine,

            life: life,

            max_count: modiflyQuiz.act_count,
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

            life: life,

            max_count: modiflyQuiz.act_count,
          },
        }); // ส่งค่า quizData ผ่าน state
      }
    }
  }, [Ispractice, Isstory]);

  return <div></div>;
}

export default Act_system;
