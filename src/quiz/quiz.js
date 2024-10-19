import React, { useState } from "react";
import "../css/quiz.css";
import Quiz_Pronunciation from "./quiz_Pronunciation";
import Quiz_spelling from "./quiz_spelling";
import Quiz_missing from "./quiz_missing_word";
import Quiz_matching from "./quiz_matching";
import {useEffect} from "react";
function Quiz({
  setIsPlayer,
  modiflyQuiz = {
    Quizcharacter: [
      {
        options: [
          {
            id: 0,
            isCorrect: true,
            text: "a",
          },
          {
            id: 2,
            isCorrect: false,
            text: "u",
          },
          {
            id: 3,
            isCorrect: false,
            text: "e",
          },
          {
            id: 1,
            isCorrect: false,
            text: "i",
          },
          {
            id: 4,
            isCorrect: false,
            text: "o",
          },
        ],
        text: "あ, ア",
      }
    ],
    Quizmatching: {
      matchAns: [
        {
          id: 3,
          matched: false,
          text: "Oshiage",
          type: "meaning",
        }
      ],
      matchQuz: [
        {
          id: 3,
          matched: false,
          text: "おしあげ",
          type: "word",
        }
      ],
    },
    Quizroadmap: [
      {
        Correct_Word: [
          {
            meaning: "train station",
            options: [
              {
                id: 0,
                isCorrect: true,
                text: "eki",
              },
              {
                id: 3,
                isCorrect: false,
                text: "ou",
              },
              {
                id: 2,
                isCorrect: false,
                text: "ei",
              },
              {
                id: 1,
                isCorrect: false,
                text: "aki",
              },
            ],
            story: "where is the train station?",
            text: "えき",
          }
        ],
        Missing_Word: [
          {
            meaning: "train station",
            options: [
              {
                id: 0,
                isCorrect: true,
                text: "え",
              },
              {
                id: 1,
                isCorrect: false,
                text: "あ",
              },
              {
                id: 3,
                isCorrect: false,
                text: "お",
              },
              {
                id: 2,
                isCorrect: false,
                text: "い",
              },
            ],
            story: "where is the train station?",
            text: "⬜き (eki)",
          }
        ],
        roadMapType: "train",
      },
    ],
  },
  userdefine,
}) {
  const [Score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [combo, setCombo] = useState(1);
  const [life, setLife] = useState(5);

  const [storyAct, setStoryAct] = useState(false);
  const [pronunciationAct, setpronunciationAct] = useState(true);
  const [missingWordAct, setMissingWordAct] = useState(false);
  const [matchingAct, setMatchingAct] = useState(false);
  const [spellingAct, setSpellingAct] = useState(false);
  const [SentenceAct, setSentenceAct] = useState(false);

  const handleTostage = () => {
    console.log(modiflyQuiz);
    setIsPlayer(false);
  };
  useEffect(() =>{
    if(life ===0){
      alert("you dead")
      window.location.reload();
    }
  },[life])
  return (
    <div>
      <div className="quiz_container">
        <div className="info_bar">
          <div>Score {Score}</div>
          <div>progress {currentQuestion}</div>
          <div>life: {life}</div>
        </div>
        <div className="action_block">
          {pronunciationAct ? (
            <Quiz_Pronunciation
              modiflyQuiz={modiflyQuiz.Quizcharacter}
              setScore={setScore}
              setCurrentQuestion={setCurrentQuestion}
              life={life}
              setLife={setLife}
              setCombo={setCombo}
              combo={combo}
              thisact={setpronunciationAct}
              nextact={setMissingWordAct}
            />
          ) : missingWordAct ? (
            <Quiz_missing
              modiflyQuiz={modiflyQuiz.QuizMissing_Word}
              setScore={setScore}
              setCurrentQuestion={setCurrentQuestion}
              life={life}
              setLife={setLife}
              setCombo={setCombo}
              combo={combo}
              thisact={setMissingWordAct}
              nextact={setSpellingAct}
            />
          ) : spellingAct ? (
            <Quiz_spelling
              modiflyQuiz={modiflyQuiz.QuizCorrect_Word}
              setScore={setScore}
              setCurrentQuestion={setCurrentQuestion}
              life={life}
              setLife={setLife}
              setCombo={setCombo}
              combo={combo}
              thisact={setSpellingAct}
              nextact={setMatchingAct}
            />
          ) : SentenceAct ? (
            <div></div>
          ) : matchingAct ? (
            <Quiz_matching
            modiflyQuiz={modiflyQuiz.Quizmatching}
              setScore={setScore}
              setCurrentQuestion={setCurrentQuestion}
              life={life}
              setLife={setLife}
              setCombo={setCombo}
              combo={combo}
              thisact={setMatchingAct}
              nextact={setMatchingAct}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Quiz;
