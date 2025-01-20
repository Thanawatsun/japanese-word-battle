import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
function Game_ticketBooth({ game_data, setload_act }) {
  const handleClick = (answer) => {
    console.log("You clicked:", answer);
    if (answer.isCorrect) {
      //ทำเมื่อตอบถูกให้มี popup ขอความเขียวขึ้นมาเพื่อกดไปหน้าถัดไป
      setload_act(true);
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
      <button
        className="Next"
        onClick={handleClickNext}
        style={{ marginTop: "1vh" }}
      >
        Confirm
      </button>
    </div>
  );
}

export default Game_ticketBooth;
