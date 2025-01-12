import { useLocation,useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Story from "./story";
import Story_per_pratice from "./story_per_practice";
import Story_post_pratice from "./story_post_practice";
import Act_stsyem from '../act_system';
function StorySystem(){
  const [number_story, setnumber_story] = useState(1); 
  const [targetText, settargetText] = useState("story_text_1"); 
  const [per_pratice_act, setper_pratice_act] = useState(false); 
  const [next_act, setreward_act] = useState(false); 
  const [load_act, setload_act] = useState(false); 
  const [story_act, setstory_act] = useState(true); 



    const location = useLocation();
    const { quizData } = location.state; // รับค่า quizData จาก state
    const { poststory } = location.state; // รับค่า quizData จาก state
    const {act_count} = location.state;

 const navigate = useNavigate();
    const story_text = quizData[act_count].story; // จัดการ act ด้วย

    const handlenext = () => {
      if(poststory & number_story+1 > 1){
        setreward_act(true)
      }
      if(number_story+1 <= story_text.story_count){
        setnumber_story(number_story+1)
        settargetText("story_text_"+(number_story+1))
        console.log(number_story)
      }
      if(number_story+1 > story_text.story_count){
        setstory_act(false)
        setper_pratice_act(true)
        setnumber_story(1)
      }
      if(number_story+1 > quizData[act_count].choose_path.per_practice.story_count & per_pratice_act){
        setper_pratice_act(false)
        setload_act(true)
      }


    };

return (
    <div>
      {load_act ?(
        <Act_stsyem Ispractice={true} modiflyQuiz={quizData} act_count={act_count} />
      ):next_act?(
        <Act_stsyem Isnext={true} modiflyQuiz={quizData} act_count={act_count} />
      ):(
        <div></div>
      )}
      <div className="story_container">
        <div></div>
      {poststory ?(
        <Story_post_pratice
        scene_number={number_story}
        setreward_act={setreward_act}
        />
      ):
      story_act ? (
            <Story
            scene_number={number_story}
            />
          ) :
          per_pratice_act ? (
            <Story_per_pratice
            scene_number={number_story}
            />
          ):(
            <div></div>
          )}
        <div className="confirm_block">
          <button className="confirm_button" onClick={handlenext} style={{marginTop: "1vh"}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorySystem;