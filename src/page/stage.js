import React, { useEffect, useState } from "react";
import "../css/stage.css";
import PlaySound from "../component/PlaySound";

function Stage({ setIsPlayer, userData, modiflyQuiz, setStageplay }) {
  const stages = Object.keys(modiflyQuiz).map(key => ({
    value: modiflyQuiz[key].stage_index,
    label: modiflyQuiz[key].stage_level
}));

console.log(stages);
  const options = [
    { value: "normal", label: "Normal" },
    { value: "hard", label: "Hard" },
  ];

  const handleTostage = (value) => {
    const shuffleArray = (array) => {
      return array
        .map((item) => ({ ...item, sort: Math.random() })) // Add random sort key
        .sort((a, b) => a.sort - b.sort) // Sort based on the random key
        .map(({ sort, ...item }) => item); // Remove the sort key
    };
    console.log(value);
    PlaySound("enter");
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
