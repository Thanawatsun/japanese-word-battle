import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick, index }) {
  const signBGImages = [
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_train_right.png?alt=media&token=3924572b-0c84-481d-a21d-9c1ef8f5e822",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_train_left.png?alt=media&token=2d49349f-520d-46c8-b692-cb4cae9b02f0",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_bus_right.png?alt=media&token=f31382a8-5410-4d28-aebb-c9dcff7f23ff",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_bus_left.png?alt=media&token=2a99ba40-f6fe-47c2-9bad-d1a9a2a79bd2",
  ];
  const signHoverBGImages = [
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_hover_train_right.png?alt=media&token=22f789d0-1896-4cad-b93c-cf155cf4e454",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_hover_train_left.png?alt=media&token=6e83fe85-a95d-40b1-8d75-e5c55cb8050d",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_hover_bus_right.png?alt=media&token=37f1ccbd-8683-4346-b2da-199207e906cf",
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fsign%2Fsign_hover_bus_left.png?alt=media&token=3ba90075-16d8-4aff-a79a-1588e623acbb",
  ];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="sign-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: `url(${
          isHovered
            ? signHoverBGImages[index % signHoverBGImages.length]
            : signBGImages[index % signBGImages.length]
        })`,
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
          src="https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2Fgame_assets%2Fgame_path_1.png?alt=media&token=a8bf25ff-c004-4bd0-ad01-d92b0d37f595"
          alt="Sign-Background-Image"
          className="choice-background-image sign-bg-image"
        />
      </div>
      <div className="choice-box">
        <div className="sign-question">
          <h3 className="sign-question-text">
            Choose the correct way to {game_data.wantToGo}.
          </h3>
        </div>
        <div className="sign-box">
          {game_data.options.map((choose, index) => (
            <AnswerButton
              key={choose.id}
              text={choose.text}
              onClick={() => handleClick(choose)}
              index={index}
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

export default Game_sign;
