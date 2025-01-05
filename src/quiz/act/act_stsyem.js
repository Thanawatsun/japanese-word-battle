import React, { useEffect, useState } from "react";
import "../../css/quiz.css";
import Story from "./story/story"
import { useNavigate } from 'react-router-dom';

function Act_stsyem(
    modiflyQuiz
) 
{
    const { quizData } = modiflyQuiz;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(modiflyQuiz)
        navigate('/story', { state: { quizData: modiflyQuiz  } }); // ส่งค่า quizData ผ่าน state
      }, []);
    return (
        <div>
            testets
            
        </div>
      );
}
export default Act_stsyem;
