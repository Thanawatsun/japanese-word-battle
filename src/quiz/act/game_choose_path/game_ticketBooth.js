import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
  return (
    <button onClick={onClick} className="ticket-button">
      {text}
    </button>
  );
}
function Game_ticketBooth({ game_data, setload_act }) {
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
          src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fgame_path_2.png?alt=media&token=8417b8c0-0a14-460f-8c64-82a5b43fea83"
          alt="Ticket-Background-Image"
          className="choice-background-image ticket-bg-image"
        />
      </div>
      <div className="choice-box">
        <div className="ticket-question">
          <h3 className="ticket-question-text">
            Choose the correct way to {game_data.wantToGo}.
          </h3>
        </div>
        <div className="ticket-box">
          {game_data.options.map((choose) => (
            <AnswerButton
              key={choose.id}
              text={choose.text}
              onClick={() => handleClick(choose)}
            />
          ))}
        </div>
      </div>
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
  );
}

export default Game_ticketBooth;
