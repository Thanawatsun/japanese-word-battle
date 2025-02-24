import React, { useEffect, useState} from "react";
import "../../css/quiz.css";
import { useNavigate } from "react-router-dom";

function Act_system({
  modiflyQuiz,
  Ispractice,
  Isstory: initialIsstory, // rename prop เพื่อความชัดเจน
  Isgame,
  Isnext,
  act_count: initialActCount, // rename prop เพื่อความชัดเจน
  userdefine,
  life,
  continueGame,
  continuePlay,
  IsQuit,
  Isloading,
  loading_type,
}) {
  const navigate = useNavigate();
  const [actCount, setActCount] = useState(initialActCount);
  const [Isstory, setIsStory] = useState(initialIsstory);

  useEffect(() => {
    if (Isnext && modiflyQuiz[actCount]?.nextAct === "act_end") {
      navigate("/reward", {
        state: {
          quizData: modiflyQuiz,
          act_count: actCount,
          userdefine: userdefine,
          life: life,
          max_count: modiflyQuiz.act_count,
        },
      });
    } else {
      if (Isnext) {
        setActCount(modiflyQuiz[actCount]?.nextAct);
        setIsStory(true);
      }
      if (Isloading) {
        navigate("/loading", {
          state: {
            quizData: modiflyQuiz,
            act_count: actCount,
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
      if (actCount > modiflyQuiz.act_count) {
        console.log("end game");
      }
      if (continuePlay) {
        setActCount(continueGame.stage_playing_act);
      }
      if (Isgame) {
        navigate("/game", {
          state: {
            quizData: modiflyQuiz,
            act_count: actCount,
            userdefine: userdefine,
            life: life,
            max_count: modiflyQuiz.act_count,
          },
        });
      }
      if (Ispractice) {
        navigate("/practice", {
          state: {
            quizData: modiflyQuiz,
            act_count: actCount,
            userdefine: userdefine,
            life: life,
            max_count: modiflyQuiz.act_count,
          },
        });
      }
      if (Isstory) {
        navigate("/story", {
          state: {
            quizData: modiflyQuiz,
            poststory: false,
            act_count: actCount,
            userdefine: userdefine,
            life: life,
            max_count: modiflyQuiz.act_count,
          },
        });
      }
    }
  }, [
    Ispractice,
    Isstory,
    Isgame,
    Isnext,
    actCount,
    userdefine,
    life,
    continueGame,
    continuePlay,
    IsQuit,
    Isloading,
    loading_type,
    modiflyQuiz,
    navigate
  ]);

  return <div></div>;
}

export default Act_system;