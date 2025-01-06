import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
function Story(){
  const [number_story, setnumber_story] = useState(1); 
  const [targetText, settargetText] = useState("story_text_1"); 
    const location = useLocation();
    const { quizData } = location.state; // รับค่า quizData จาก state
    const story_text = quizData.act_1.story; // จัดการ act ด้วย
    console.log(quizData); // ตรวจสอบค่าที่ได้รับ
    console.log(quizData.act_1.story.story_text.story_text_1); // ตรวจสอบค่าที่ได้รับ
    console.log(targetText)
    const handlenext = () => {
      setnumber_story(number_story+1)
      settargetText("story_text_"+(number_story+1))
    };
return (
    <div>
      <div className="story_container">
        <div className="story_action">{story_text.story_image.story_image_1}</div>
        <div className="story_text">{story_text.story_text[targetText]}</div>
        <div className="confirm_block">
          <button className="confirm_button" onClick={handlenext} style={{marginTop: "1vh"}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Story;