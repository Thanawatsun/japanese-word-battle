import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
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
      alert("incorrect");
    }
  };
  const handleClickNext = () => {
    setload_act(true);
  };
  return (
    <div>
      Ticket
      <div>Choose the correct way to {game_data.wantToGo}.</div>
      {game_data.options.map((choose) => (
        <AnswerButton
          key={choose.id}
          text={choose.text}
          onClick={() => handleClick(choose)}
        />
      ))}
      {showBar && (
        <div className="green-con" style={{ marginTop: "-8vh" }}>
          {showGreenBar ? (
            <div>
              <div>Correct: the answer is {game_data.answer}</div>
              <button className="green-button" onClick={handleClickNext}>
                Next
              </button>
            </div>
          ) : (
            <div>
              <div>Incorrect</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game_ticketBooth;
