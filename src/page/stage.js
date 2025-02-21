import React, { useEffect, useState } from "react";
import "../css/stage.css";
import PlaySound from "../component/PlaySound";

function Stage({ setIsPlayer, userData, modiflyQuiz, setStageplay }) {
  const stages = Object.keys(modiflyQuiz).map((key) => ({
    value: modiflyQuiz[key].stage_index,
    label: modiflyQuiz[key].stage_level,
    image: modiflyQuiz[key].stage_image
  }));

  const handleTostage = (value) => {
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
            backgroundImage: `url(${stage.image})`,
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
