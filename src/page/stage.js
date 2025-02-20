import React, { useEffect, useState } from "react";
import "../css/stage.css";
import PlaySound from "../component/PlaySound";

function Stage({ setIsPlayer, userData, modiflyQuiz, setStageplay }) {
  const stages = Object.keys(modiflyQuiz).map((key) => ({
    value: modiflyQuiz[key].stage_index,
    label: modiflyQuiz[key].stage_level,
  }));

  console.log(stages);
  const stageImage =
    "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/img%2FTokyoSkytreeView.webp?alt=media&token=709453fc-f9e0-4268-a587-900257bfc386";
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
          style={{
            backgroundImage: `url(${stageImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {stage.label}
        </div>
      ))}
    </div>
  );
}

export default Stage;
