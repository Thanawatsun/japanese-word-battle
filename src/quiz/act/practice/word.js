import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function Word({ this_stage, next_stage, game_data }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBar, setshowBar] = useState(false);
  const [showGreenBar, setshowGreenBar] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option); // อัปเดตว่าเลือกตัวไหน
    const audio = new Audio(option.audio);
    audio.play();
  };
  const handleplaySound = () => {
    const audio = new Audio(game_data.audio);
    audio.play();
  };
  useEffect(() => {
    console.log(game_data);
    const audio = new Audio(game_data.audio);
    audio.play();
  }, [next_stage]);
  const handleConfirm = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption.isCorrect;
      setshowBar(true);
      if (isCorrect) {
        console.log("Correct!");
        setshowGreenBar(true);
      } else {
        console.log("Incorrect!");
      }
    } else {
      console.log("Please select an option before confirming.");
    }
  };
  const handleClick = () => {
    this_stage(false);
    next_stage(true);
    setshowGreenBar(false);
    setshowBar(false);
    setSelectedOption(null);
  };
  const handleClickIncorrect = () => {
    setshowBar(false);
    setSelectedOption(null);
  };

  return (
    <div className="center-quiz-block">
      <div className="center-quiz-pt1">
        <h3>Choose the correct pronunciation.</h3>
      </div>
      <div className="center-quiz-pt2">
        <div className="question_block_voice" onClick={() => handleplaySound()}>
          <h3 className="question-text">{game_data.text}</h3>
        </div>
      </div>
      <div className="center-quiz-pt3">
        <div className="question-card">
          <ListGroup as="ul">
            {game_data.options.map((option) => {
              return (
                <ListGroup.Item
                  as="li"
                  className={`btn ${
                    selectedOption?.id === option.id ? "selected" : ""
                  }`}
                  variant="primary"
                  onClick={() => handleOptionClick(option)}
                  key={option.id}
                >
                  {option.text}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div className="confirm_block quiz-confirm-block">
          <button
            className="confirm_button"
            onClick={handleConfirm}
            disabled={!selectedOption}
          >
            Confirm
          </button>
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
                <button className="green-button" onClick={handleClick}>
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
export default Word;
