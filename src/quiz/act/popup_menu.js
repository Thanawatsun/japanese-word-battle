import React, { useState } from "react";
import "../../css/stage.css";
import Act_stsyem from "./act_system";

function Poppu_menu({ modiflyQuiz, act_count, userdefine, life }) {
  const [load_act, setload_act] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const toggleQuit = () => {
    setload_act(true);
  };

  return (
    <div className="popupMenu">
      <button onClick={togglePopup} className="menu-popup-button">
        Menu
      </button>
      {showPopup && (
        <>
          <div className="popup-box"></div>
          <div className="popup">
            <div className="popup-content">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FMenuImage.png?alt=media&token=869102bf-d9fc-437a-9f41-cf3f64471fcd"
                alt="Menu-Image"
                className="menu-image"
              />
              <button onClick={togglePopup} className="confirm-button">
                <h5>Continue</h5>
              </button>
              <button onClick={toggleQuit} className="cancel-button">
                <h5>Quit</h5>
              </button>
            </div>
          </div>
        </>
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
