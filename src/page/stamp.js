import "../css/bankword.css";
import { app } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, getDatabase, get } from "firebase/database";
import React, { useEffect, useState } from "react";

function Stamp({ stamplist }) {
  const [showvocabulary, setShowvocabulary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wordsArray = [];
          const databaseRef = ref(getDatabase(app), `Stamp_Data/`);
          const snapshot = await get(databaseRef);
          const stampData = snapshot.val();
          console.log(stampData)
          console.log(stamplist)
          if (stampData) {
            for (var key of Object.keys(stampData)) {
              if(stamplist[key] !== undefined){
                const image = stamplist[key].Stamp
                //console.log(key + " -> " + stamplist[key].Stamp)
                //console.log(key + " -> " + stampData[key][image])
                wordsArray.push({image:stampData[key][image]})
              }
              else{
                wordsArray.push({image:"https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/stamp%2Fstmap_unknow.jpeg?alt=media&token=0670b348-c922-497d-a427-c26dd169b887"})
              }
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
  }, [stamplist]);

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
function VocabularyCard({ image }) {


  return (
    <div className={'cards'}>
      <div className="word">
        <img src={image} alt=""  width="75px"/>
      </div>
    </div>
  );
}

export default Stamp;
