import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function Pronunciation({ this_stage, next_stage, game_data }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBar, setshowBar] = useState(false);
  const [showGreenBar, setshowGreenBar] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option); // อัปเดตว่าเลือกตัวไหน
  };
  const handleClickAudio = () => {
    const audio = new Audio(game_data.audio);
    audio.play(); //เล่นเสียง
  };
  useEffect(() => {
    console.log(game_data);
    const audio = new Audio(game_data.audio);
    audio.play();
  }, []);
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
  };
  return (
    <div>
      Pronunciation
      <div className="question_block_voice" onClick={handleClickAudio}>
        <h3 className="question-text">{game_data.text}</h3>
      </div>
      <div className="">
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
        <div className="confirm_block">
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
        <div className="green-con" style={{ marginTop: "-8vh" }}>
          {showGreenBar ? (
            <div>
              <div>Correct: the answer is {game_data.answer}</div>
              <button className="green-button" onClick={handleClick}>
                Next
              </button>
            </div>
          ) : (
            <div>
              <div>Incorrect: the answer is {game_data.answer}</div>
              <button className="red-button" onClick={handleClick}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Pronunciation;
