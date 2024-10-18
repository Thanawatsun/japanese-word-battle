import "../css/bankword.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react"
function Bankword() {
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
      const [searchTerm, setSearchTerm] = useState("");
      const [searchResults, setSearchResults] = useState(null);
      useEffect(()=>{
        try {
            const databaseRef = ref(getDatabase(app), `term_bank/` + 'わたし');
            onValue(databaseRef, (snapshot) => {
              const word = snapshot.val();
              console.log(word.forms[0]);
              console.log(word.spelling);
              console.log(word.tag[0].meaning[0]);
              setSearchResults(word);
              
              setVocabulary(
                [{
                    word:word.forms[0],
                    reading:word.spelling,
                    meaning:word.tag[0].meaning[0],
                }]
              )
            });
          } catch (error) {
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