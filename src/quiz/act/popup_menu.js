import React, { useState } from 'react';
import "../../css/stage.css"
import Act_stsyem from "./act_system";
function Poppu_menu(
{  modiflyQuiz,
  act_count,
  userdefine,
  life,}
) {

    const [load_act, setload_act] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const toggleQuit = () => {
    setload_act(true)
  };

  return (
    <div class="popupMenu">
      <button onClick={togglePopup}>Menu</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
              <p>img</p>
            <button onClick={togglePopup}>Continue</button>
            <button onClick={toggleQuit}>Quit</button>
          </div>
        </div>
      )}
            {load_act ? (
        <Act_stsyem
          IsQuit={true}
          Isnext={false}
          modiflyQuiz={modiflyQuiz}
          act_count={act_count}
          userdefine={userdefine}
          life={life}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Poppu_menu;