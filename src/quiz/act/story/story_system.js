import { useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Story from "./story";
import StoryPerPratice from "./story_per_practice";
import ActSystem from "../act_system";
import PoppuMenu from "../popup_menu";
import PlaySound from "../../../component/PlaySound";

function StorySystem() {
  const [number_story, setnumber_story] = useState(1);
  //const [targetText, settargetText] = useState("story_text_1");
  const [per_pratice_act, setper_pratice_act] = useState(false);
  const [next_act, setreward_act] = useState(false);
  const [load_act, setload_act] = useState(false);
  const [story_act, setstory_act] = useState(true);
  const [life_act, setlife_act] = useState(0);

  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { poststory } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const { userdefine } = location.state;
  //const { max_count } = location.state;
  const { life } = location.state;
  const story_text = quizData[act_count].story; // จัดการ act ด้วย
  useEffect(() => {
    setlife_act(life);
  }, [life]);
  const handlenext = () => {
    PlaySound("button");
    if (poststory & (number_story + 1 > 1)) {
      setreward_act(true);
    }
    if (number_story + 1 <= story_text.story_count) {
      setnumber_story(number_story + 1);
      /*settargetText("story_text_" + (number_story + 1));
      console.log(number_story);*/
    }
    if (number_story + 1 > story_text.story_count) {
      setstory_act(false);
      setper_pratice_act(true);
      setnumber_story(1);
    }
    if (
      (number_story + 1 >
        quizData[act_count].choose_path.per_practice.story_count) &
      per_pratice_act
    ) {
      setper_pratice_act(false);
      setload_act(true);
    }
  };

  return (
    <div>
      <PoppuMenu
        modiflyQuiz={quizData}
        act_count={act_count}
        act_rewar={act_count}
        userdefine={userdefine}
        life={life_act}
      />
      {load_act ? (
        <ActSystem
          Ispractice={true}
          modiflyQuiz={quizData}
          act_count={act_count}
          act_reward={act_count}
          userdefine={userdefine}
          life={life_act}
        />
      ) : next_act ? (
        <ActSystem
          Isnext={true}
          modiflyQuiz={quizData}
          act_count={act_count}
          act_rewar={act_count}
          userdefine={userdefine}
          life={life_act}
        />
      ) : (
        <div></div>
      )}
      <div className="story-main-container">
        {/* <div></div>
        <div>time point left : {life_act}</div>
        <div>
          act count : {act_count[4]}/{max_count}
        </div> */}

        {poststory ? (
          <div></div>
        ) : story_act ? (
          <Story scene_number={number_story} />
        ) : per_pratice_act ? (
          <StoryPerPratice scene_number={number_story} />
        ) : (
          <div></div>
        )}
        <div className="confirm_block">
          <button className="confirm_button" onClick={handlenext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorySystem;
