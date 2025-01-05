import React, { useState } from "react";
import "../css/stage.css";
import { ref, onValue, getDatabase } from "firebase/database";
import { app } from "../firebase";
function Stage({ setIsPlayer, userData, setModiflyQuiz }) {
  const [selectedValue, setSelectedValue] = useState("easy");
  const stages = [{ value: "level01", label: "Stage 1" },{ value: "level01_test", label: "Stage test" }];
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
    const databaseRef = ref(getDatabase(app), "Game_Level/" + value);
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      //learning levelเอาไว้ทำตัว Quizcharacter
      //ปรับระดับความยากง่ายด้วยการเลือกข้อมูล missing_Word correct_Word matching
      /*
      for (let i = 0; i < data.Quizcharacter.length; i++) {
        data.Quizcharacter[i].options = shuffleArray(
          data.Quizcharacter[i].options
        );
      }

      const quizcorrect_Word = data.QuizCorrect_Word;

      for (let j = 0; j < quizcorrect_Word.length; j++) {
        quizcorrect_Word[j].options = shuffleArray(quizcorrect_Word[j].options);
      }

      const quizmissing_Word = data.QuizMissing_Word;

      for (let j = 0; j < quizmissing_Word.length; j++) {
        quizmissing_Word[j].options = shuffleArray(quizmissing_Word[j].options);
      }

      const quizSentence = data.QuizSentence;

      for (let j = 0; j < quizSentence.length; j++) {
        quizSentence[j].options = shuffleArray(quizSentence[j].options);
      }

      const quizdata = data.Quizmatching;
      quizdata.matchQuz = shuffleArray(quizdata.matchQuz);
      quizdata.matchAns = shuffleArray(quizdata.matchAns);
*/
      setModiflyQuiz(data);
      console.log(data);
    });
    console.log(value);
    setIsPlayer(true);
  };
  return (
    <div className="stageDisplay">
      <div className="mapdisplay">
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
    </div>
  );
}

export default Stage;
