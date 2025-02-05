import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick, index }) {
  const signBGImages = [
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_train_right.png?alt=media&token=3924572b-0c84-481d-a21d-9c1ef8f5e822",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_train_left.png?alt=media&token=2d49349f-520d-46c8-b692-cb4cae9b02f0",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_bus_right.png?alt=media&token=f31382a8-5410-4d28-aebb-c9dcff7f23ff",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_bus_left.png?alt=media&token=2a99ba40-f6fe-47c2-9bad-d1a9a2a79bd2",
  ];

  return (
    <button
      onClick={onClick}
      className="sign-button"
      style={{
        backgroundImage: `url(${signBGImages[index % signBGImages.length]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {text}
    </button>
  );
}

function Game_sign({ game_data, setload_act }) {
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
          src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fgame_path_1.png?alt=media&token=959d7e51-bc6d-4e00-94bb-e528708024a4"
          alt="Sign-Background-Image"
          className="choice-background-image"
        />
      </div>
      <div className="choice-box">
        <div>Choose the correct way to {game_data.wantToGo}.</div>
        {game_data.options.map((choose, index) => (
          <AnswerButton
            key={choose.id}
            text={choose.text}
            onClick={() => handleClick(choose)}
            index={index}
          />
        ))}
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

export default Game_sign;
