import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./MatchingSty.css";

function Matching() {
  const [score, setScore] = useState(0);
  const [matchQuzArray, setMatchQuzArray] = useState([]);
  const [matchAnsArray, setMatchAnsArray] = useState([]);
  const [finish, setFinish] = useState(false);
  const [allMatch, setAllMatch] = useState(0);
  const [selectLeft, setSelectLeft] = useState(null);
  const [selectRight, setSelectRight] = useState(null);

  const matchQuz = [
    {
      id: 1,
      text: "えき",
      type: "word",
      matched: false,
    },
    {
      id: 2,
      text: "バス",
      type: "word",
      matched: false,
    },
  ];
  const matchAns = [
    {
      id: 1,
      text: "Train",
      type: "meaning",
      matched: false,
    },
    {
      id: 2,
      text: "Bus",
      type: "meaning",
      matched: false,
    },
  ];

  function NewGame() {
    setScore(0);
    setMatchQuzArray(matchQuz);
    setMatchAnsArray(matchAns);
    setFinish(false);
    setAllMatch(0);
    setSelectLeft(null);
    setSelectRight(null);
  }

  function HandleSelected(item) {
    if (item.type === "word" && !item.matched) {
      console.log("yes");
      setSelectLeft(item);
    } else if (!item.matched) {
      console.log("no");
      setSelectRight(item);
    }
  }

  function RemoveSelection() {
    setSelectLeft(null);
    setSelectRight(null);
  }

  React.useEffect(() => {
    if (selectLeft && selectRight) {
      if (selectLeft.id === selectRight.id) {
        setScore(score + 1);
        RemoveSelection();
      } else {
        RemoveSelection();
      }
    }
  }, [score, selectLeft, selectRight]);

  React.useEffect(() => {
    NewGame();
  }, []);

  return (
    <div className="container">
      {finish ? (
        <div>
          <h2>yes</h2>
        </div>
      ) : (
        <div></div>
      )}
      <div className="header">
        <h1>Matching the correct answer.</h1>
        <h2>{score}</h2>
      </div>
      <div className="board container text-center">
        <div className="row">
          <ListGroup as="ul" className="matching-items col">
            {matchQuz.map((item) => (
              <ListGroup.Item
                as="li"
                key={item.id}
                onClick={() => HandleSelected(item)}
              >
                {item.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup as="ul" className="matching-items col">
            {matchAns.map((item) => (
              <ListGroup.Item
                as="li"
                key={item.id}
                onClick={() => HandleSelected(item)}
              >
                {item.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default Matching;
