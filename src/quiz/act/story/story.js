import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "../../../css/quiz.css";
function Story(
  scene
){
  const [targetText, settargetText] = useState("story_text_1"); 
    const location = useLocation();
    const { quizData } = location.state; // รับค่า quizData จาก state
    const story = quizData.story; // จัดการ act ด้วย
    useEffect(()=>{
      settargetText("story_text_"+(scene.scene_number))
    },[scene])
return (
    <div className="story_container">
        <div className="story_action">{story.story_image[targetText]}</div>
        <div className="story_text">{story.story_text[targetText]}</div>
    </div>
  );
}

export default Story;