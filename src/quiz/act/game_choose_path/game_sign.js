import React, { useEffect, useState } from "react";

function AnswerButton({ text, onClick }) {
    return (
      <button onClick={onClick}>
        {text}
      </button>
    );
  }

function Game_sign(
    {game_data,
    setload_act
    }
) {
    const [way, setWay] = useState("Train Station") //ใส่ชื่อสถานที่จะไปใน databnase ด้วย
    const handleClick = (answer) => {
        console.log('You clicked:', answer);
        if (answer.isCorrect){
            //ทำเมื่อตอบถูกให้มี popup ขอความเขียวขึ้นมาเพื่อกดไปหน้าถัดไป
            setload_act(true)
        }
        else{
            alert("incorrect")
        }
      };
      const handleClickNext = () => {
        setload_act(true)
      }

    return(
        <div>
            <div>Choose the correct way to {game_data.wantToGo}.</div>
        {game_data.options.map((choose) => (
          <AnswerButton key={choose.id} text={choose.text} onClick={() => handleClick(choose)} />
        ))}
              <button
        className="Next"
        onClick={handleClickNext}
        style={{ marginTop: "1vh" }}
      >
        Confirm
      </button>
      </div>
    )
}

export default Game_sign;