import React, { useEffect, useState } from "react";
import "../../css/quiz.css";

import { useNavigate } from 'react-router-dom';

function Act_stsyem(
    {modiflyQuiz,
    Ispractice,
    Isstory,
    Isgame,
    Isstory_post_game,
    Isreward,
    act = "act_1"
},
) 
{
    console.log(Isstory)
    const { quizData } = modiflyQuiz;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(Ispractice)
        if(Isstory_post_game === true){
            navigate('/story', { state: { quizData: modiflyQuiz,poststory:true  } });
        }
        if(Isgame === true){
            navigate('/game', { state: { quizData: modiflyQuiz  } });
        }
        if(Ispractice === true){
            navigate('/practice', { state: { quizData: modiflyQuiz  } });
        }
        if(Isstory === true){
            console.log(modiflyQuiz)
        navigate('/story', { state: { quizData: modiflyQuiz[act]  ,poststory:false} }); // ส่งค่า quizData ผ่าน state
        }
        
      }, [Ispractice,Isstory]);
    return (
        <div>
            
            
        </div>
      );
}
export default Act_stsyem;
