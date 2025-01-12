import React, { useState } from "react";
import "../css/stage.css";
import { ref, onValue, getDatabase } from "firebase/database";
import { app } from "../firebase";
function Stage({ setIsPlayer, userData, setModiflyQuiz, setStageplay }) {
  const [selectedValue, setSelectedValue] = useState("easy");
  const stages = [
    { value: "level01", label: "Stage 1" },
    { value: "level01_test", label: "Stage test" },
  ];
  const options = [
    { value: "normal", label: "Normal" },
    { value: "hard", label: "Hard" },
  ];

  const handleChange = (event) => {
    setSelectedValue(event.target);
    console.log("Selectedvalue:", event.target.value);
  };
  const handleTostage = (value) => {
    const shuffleArray = (array) => {
      return array
        .map((item) => ({ ...item, sort: Math.random() })) // Add random sort key
        .sort((a, b) => a.sort - b.sort) // Sort based on the random key
        .map(({ sort, ...item }) => item); // Remove the sort key
    };
    console.log(value);
    setStageplay(value);
    setIsPlayer(true);
  };
  return (
    <div className="stage-display">
      {stages.map((stage) => (
        <div
          key={stage.value}
          className="stage"
          value={stage.value}
          onClick={() => handleTostage(stage.value)}
        >
          {stage.label}
        </div>
      ))}
    </div>
  );
}

export default Stage;
