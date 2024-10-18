import "../css/bankword.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react"
function Bankword({wordlist}) {
    const [vocabulary, setVocabulary] = useState([
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        { word: 'คำศัพท์', reading: 'คำอ่าน', meaning: 'ความหมาย' },
        // เพิ่มข้อมูลคำศัพท์อื่นๆ
      ]);
      useEffect(()=>{
        try {
          const wordsArray = [];
          for (const word of wordlist) {
            const databaseRef = ref(getDatabase(app), `term_bank/` + word);
            onValue(databaseRef, (snapshot) => {
              const word = snapshot.val();
              wordsArray.push({
                word:word.forms[0],
                reading:word.spelling,
                meaning:word.tag[0].meaning[0],
              });
              
            });
            setVocabulary(wordsArray)
          }} catch (error) {
            console.error("Error uploading data:", error);
          }
      },[])
    return(
        <div className="vocabulary-list">
        {vocabulary.map((item, index) => (
          <VocabularyCard key={index} {...item} />
        ))}
      </div>
    )
}
function VocabularyCard({ word, reading, meaning }) {
    const [expanded, setExpanded] = useState(false);
  
    const handleWordClick = () => {
      setExpanded(!expanded);
    };
  
    return (
        <div className={`cards ${expanded ? 'expanded' : ''}`}>
          <div className="word" onClick={handleWordClick}>
          Word : {word}
            <div className={`triangle ${expanded ? 'rotated' : ''}`}></div>
            
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