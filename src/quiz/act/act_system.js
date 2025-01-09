import React, { useEffect, useState } from "react";
import "../../css/quiz.css";

import { useNavigate } from 'react-router-dom';

function Act_stsyem(
    {modiflyQuiz,
    Ispractice,
    Isstory,
    Isgame,
    Isstory_post_game,
    Isnext,
    Isreward,
    act_count,
    rawData
},
) 
{
    console.log(rawData.act_count)
    const { quizData } = modiflyQuiz;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(Ispractice)
        if(Isnext){
            modiflyQuiz= rawData
            act_count = act_count+1
            Isstory_post_game= false
            Isstory = true
        }
        if(act_count > rawData.act_count){
            console.log("end game")
        }
        if(Isstory_post_game === true){
            navigate('/story_endact', { state: { quizData: modiflyQuiz,poststory:true, rawData:rawData  } });
        }
        if(Isgame === true){
            navigate('/game', { state: { quizData: modiflyQuiz, rawData:rawData  } });
        }
        if(Ispractice === true){
            navigate('/practice', { state: { quizData: modiflyQuiz, rawData:rawData} });
        }
        if(Isstory === true){
            console.log(modiflyQuiz)
            console.log(act_count)
        navigate('/story', { state: { quizData: modiflyQuiz["act_"+act_count]  ,poststory:false, rawData:modiflyQuiz} }); // ส่งค่า quizData ผ่าน state
        }
        
      }, [Ispractice,Isstory]);
    return (
        <div>
            
            
        </div>
      );
}
export default Act_stsyem;
