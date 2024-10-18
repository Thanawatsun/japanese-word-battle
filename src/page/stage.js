import React, { useState } from "react";
import "../css/stage.css";
function Stage({setIsPlayer,userData}) {
  const [selectedValue, setSelectedValue] = useState("easy");

  const options = [
    { value: "normal", label: "Normal" },
    { value: "hard", label: "Hard" },
  ];

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("Selectedvalue:", event.target.value);
  };
  const handleTostage = () => {
    console.log('let go')
    setIsPlayer(true)
  };
  return (
    <div className="stageDisplay">
      <div className="difficulty_box">
      <select className="chooseDifficulty" value={selectedValue} onChange={handleChange}>
        <option value="easy">Easy</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
      <div className="mapdisplay">
        <div className="stage" onClick={handleTostage}>
            Stage01
        </div>
        
      </div>
    </div>
  );
}

export default Stage;
