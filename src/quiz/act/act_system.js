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
},
) 
{
    console.log(modiflyQuiz)
    const { quizData } = modiflyQuiz;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(modiflyQuiz[act_count].nectAct)
        if(modiflyQuiz[act_count].nextAct === "act_end"){
            alert("end")
            navigate('/')
            //เดี๋ยวมาใส่ด่าน reward
        }
        else{
            if(Isnext){

                act_count = modiflyQuiz[act_count].nextAct
                Isstory_post_game= false
                Isstory = true
            }
            if(act_count > modiflyQuiz.act_count){
                console.log("end game")
            }
            if(Isstory_post_game === true){
                navigate('/story_endact', { state: { quizData: modiflyQuiz,poststory:true,  act_count:act_count  } });
            }
            if(Isgame === true){
                navigate('/game', { state: { quizData: modiflyQuiz,  act_count:act_count  } });
            }
            if(Ispractice === true){
                navigate('/practice', { state: { quizData: modiflyQuiz,  act_count:act_count} });
            }
            if(Isstory === true){
                console.log(modiflyQuiz)
                console.log(act_count)
            navigate('/story', { state: { quizData: modiflyQuiz  ,poststory:false, act_count:act_count} }); // ส่งค่า quizData ผ่าน state
            }
        }
        
        
      }, [Ispractice,Isstory]);
    return (
        <div>
            
            
        </div>
      );
}
export default Act_stsyem;
