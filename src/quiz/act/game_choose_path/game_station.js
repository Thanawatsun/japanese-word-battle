import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
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
      <div>
        Station
        <div>Choose the correct way to {game_data.wantToGo}.</div>
        {game_data.options.map((choose) => (
          <AnswerButton
            key={choose.id}
            text={choose.text}
            onClick={() => handleClick(choose)}
          />
        ))}
        {showBar && (
          <div className="green-con">
            {showGreenBar ? (
              <div className="green-box">
                <div className="box-inner">
                  <div className="green-text">
                    Correct: the answer is {game_data.answer}
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
                    Incorrect: the answer is {game_data.answer}
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
    </div>
  );
}

export default Game_station;
