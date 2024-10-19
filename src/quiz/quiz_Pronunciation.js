import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../css/quiz.css";

function Quiz_Pronunciation({
  modiflyQuiz = [
    {
      text: "あ",
      options: [
        { id: 0, text: "a", isCorrect: true },
        { id: 1, text: "i", isCorrect: false },
        { id: 2, text: "u", isCorrect: false },
        { id: 3, text: "e", isCorrect: false },
        { id: 4, text: "o", isCorrect: false },
      ],
    },
  ],
  setScore,
  setCombo,
  setLife,
  life,
  setCurrentQuestion,
  combo,
  thisact,
  nextact,
}) {
  const [PcurrentQuestion, setPCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBar, setshowBar] = useState(false);
  const [showGreenBar, setshowGreenBar] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
  };

  const handleConfirm = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption.isCorrect;
      setshowBar(true);
      if (isCorrect) {
        console.log("Correct!");
        // Update score, combo, etc. (logic based on your requirements)

        setScore((prevScore) => prevScore + 10 * combo);
        setCombo((prevCombo) => prevCombo + 1);
        setshowGreenBar(true);
      } else {
        setLife(life-1)
        console.log("Incorrect!");
        setCombo(1);
      }
    } else {
      console.log("Please select an option before confirming.");
    }
  };

  const handlenext = () => {
    setshowBar(false);
    setshowGreenBar(false);
    if (PcurrentQuestion < modiflyQuiz.length - 1) {
      setPCurrentQuestion(PcurrentQuestion + 1);
      setSelectedOption(null); // Reset selected option for next question
    } else {
      thisact(false);
      nextact(true);
    }
  };
  return (
    <div>
      {showBar && <div className="white-box"></div>}
      <div className="question_block_voice">
        <h3 className="question-text">{modiflyQuiz[PcurrentQuestion].text}</h3>
      </div>
      <div className="">
        <div className="question-card">
          <ListGroup as="ul">
            {modiflyQuiz[PcurrentQuestion].options.map((option) => {
              return (
                <ListGroup.Item
                  as="li"
                  className={`btn ${
                    selectedOption?.id === option.id ? "selected" : ""
                  }`} // Add "selected" class for visual feedback
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
      {showBar && (
        <div className="green-con" style={{marginTop: "-8vh"}}>
          {showGreenBar ? (
            <div className="green-bar"></div>
          ) : (
            <div className="red-bar"></div>
          )}
          {showGreenBar ? (
            <div>
              <div>nice</div>
              <button className="green-button" onClick={handlenext}>
                Next
              </button>
            </div>
          ) : (
            <div>
              <div>oh no</div>
              <button className="red-button" onClick={handlenext}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz_Pronunciation;
