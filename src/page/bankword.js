import "../css/bankword.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase, get } from "firebase/database";
import React, { useEffect, useState } from "react";

function Bankword({ wordlist }) {
  const [showvocabulary, setShowvocabulary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wordsArray = [];
        for (const word of wordlist) {
          const databaseRef = ref(getDatabase(app), `term_bank/` + word);
          const snapshot = await get(databaseRef);
          const wordData = snapshot.val();

          if (wordData) {
            wordsArray.push({
              word: wordData.forms[0],
              reading: wordData.spelling,
              meaning: wordData.tag[0].meaning[0],
            });
          }
        }

        setShowvocabulary(wordsArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [wordlist]);

  return (
    <div>
      {isLoading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="vocabulary-list">
          {showvocabulary.map((item, index) => (
            <VocabularyCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
function VocabularyCard({ word, reading, meaning }) {
  const [expanded, setExpanded] = useState(false);

  const handleWordClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`cards ${expanded ? "expanded" : ""}`}>
      <div className="word" onClick={handleWordClick}>
        Word : {word}
        <div className={`triangle ${expanded ? "rotated" : ""}`}></div>
      </div>
      {expanded && (
        <div className="details">
          <div className="reading">Spelling : {reading}</div>
          <div className="meaning">Meaning : {meaning}</div>
        </div>
      )}
    </div>
  );
}

export default Bankword;
