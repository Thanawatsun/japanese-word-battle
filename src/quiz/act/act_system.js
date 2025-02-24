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
  act_reward,
  userdefine,
  life,
  IsQuit,
  Isloading,
  loading_type,
}) {

  const navigate = useNavigate();
  console.log(modiflyQuiz[act_reward])
  useEffect(()=>{
    if ((modiflyQuiz[act_reward].nextAct === "act_end") & Isnext) {
      navigate("/reward", {
        state: {
          quizData: modiflyQuiz,

          act_count: act_reward,

          userdefine: userdefine,

          life: life,

          max_count: modiflyQuiz.act_reward,
        },
      });
    }
  },[Isnext,life,act_reward, modiflyQuiz,navigate,userdefine])
  if (Isnext && modiflyQuiz[act_count].nextAct !== undefined) {
    act_count = modiflyQuiz[act_count].nextAct;

    Isstory = (true);
  }
  useEffect(() => {
    if ((modiflyQuiz[act_count].nextAct === "act_end") & Isnext) {

    } else {

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
  }, [  modiflyQuiz,
    Ispractice,
    Isstory,
    Isgame,
    Isnext,
    act_count,
    userdefine,
    life,
    IsQuit,
    Isloading,
    loading_type,navigate]);

  return <div></div>;
}

export default Act_system;
