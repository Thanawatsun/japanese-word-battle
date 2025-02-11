import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
  return (
    <button onClick={onClick} className="station-button">
      {text}
    </button>
  );
}
function Game_station({ game_data, setload_act }) {
  const [way, setWay] = useState("Train Station"); //ใส่ชื่อสถานที่จะไปใน databnase ด้วย
  const [showBar, setshowBar] = useState(false);
  const [showGreenBar, setshowGreenBar] = useState(false);
  const handleClick = (answer) => {
    console.log("You clicked:", answer);
    setshowBar(true);
    if (answer.isCorrect) {
      //ทำเมื่อตอบถูกให้มี popup ขอความเขียวขึ้นมาเพื่อกดไปหน้าถัดไป
      setshowGreenBar(true);
    } else {
      console.log("Incorrect!");
    }
  };
  const handleClickNext = () => {
    setload_act(true);
  };
  const handleClickIncorrect = () => {
    setshowBar(false);
  };

  return (
    <div>
      <div className="choice-background-image-box">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fgame_path_3.png?alt=media&token=e79843c5-cffd-453d-bf52-454dda426d6f"
          alt="Station-Background-Image"
          className="choice-background-image station-bg-image"
        />
      </div>
      <div className="choice-box">
        <div className="station-question">
          <h3 className="station-question-text">
            Choose the correct way to {game_data.wantToGo}.
          </h3>
        </div>
        <div className="station-box">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fstation_node.png?alt=media&token=eea4c49a-45df-44f6-a05f-15d13bd673b3"
            alt="Station-Node-Image"
            className="station-node-image"
          />
          <div className="station-button-group">
            {game_data.options.map((choose) => (
              <AnswerButton
                key={choose.id}
                text={choose.text}
                onClick={() => handleClick(choose)}
              />
            ))}
          </div>
        </div>
      </div>
      {showBar && (
        <div className="green-con">
          {showGreenBar ? (
            <div className="green-box">
              <div className="box-inner">
                <div className="green-text">
                  Correct: You chose the right station.
                </div>
                <button className="green-button" onClick={handleClickNext}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="red-box">
              <div className="box-inner">
                <div className="red-text">
                  Incorrect: Please choose the station again.
                </div>
                <button className="red-button" onClick={handleClickIncorrect}>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game_station;
