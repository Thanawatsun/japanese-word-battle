import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
function Story(){
  const [number_story, setnumber_story] = useState(1); 
  const [targetText, settargetText] = useState("story_text_1"); 
    const location = useLocation();
    //const { quizData } = location.state; // รับค่า quizData จาก state
    const quizData= {
      "act_1": {
          "choose_path": {
              "per_practice": {
                  "story_count": 1,
                  "story_image": {
                      "story_image_1": ""
                  },
                  "story_text": {
                      "story_text_1": "story text 01"
                  }
              },
              "post_practice": {
                  "correct_path": {
                      "story_count": 1,
                      "story_image": {
                          "story_image_1": ""
                      },
                      "story_text": {
                          "story_text_1": "story text 01"
                      }
                  },
                  "game": {
                      "answer": "えき",
                      "options": [
                          {
                              "audio": "",
                              "id": 0,
                              "image": "",
                              "isCorrect": true,
                              "text": "えき"
                          },
                          {
                              "audio": "",
                              "id": 1,
                              "image": "",
                              "isCorrect": false,
                              "text": "バス"
                          }
                      ],
                      "story_image_1": "",
                      "type": "sign"
                  }
              }
          },
          "practice": {
              "pronunciation": [
                  {
                      "answer": "a",
                      "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/character%2Fa.mp3?alt=media&token=045559a0-b36a-48a5-be1c-f478d6f25f8a",
                      "options": [
                          {
                              "id": 1,
                              "isCorrect": false,
                              "text": "i"
                          },
                          {
                              "id": 0,
                              "isCorrect": true,
                              "text": "e"
                          }
                      ],
                      "text": "え"
                  }
              ],
              "word": [
                  {
                      "answer": "E",
                      "meaning": "train station",
                      "options": [
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fe.mp3?alt=media&token=f0bce1a2-ae62-4ea5-90cf-5f3e97f64b86",
                              "id": 0,
                              "isCorrect": true,
                              "text": "E"
                          },
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fa.mp3?alt=media&token=276156ed-2f51-4787-832c-37492525020d",
                              "id": 1,
                              "isCorrect": false,
                              "text": "A"
                          }
                      ],
                      "text": "⬜ki"
                  },
                  {
                      "answer": "え",
                      "meaning": "train station",
                      "options": [
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fa.mp3?alt=media&token=276156ed-2f51-4787-832c-37492525020d",
                              "id": 1,
                              "isCorrect": false,
                              "text": "あ"
                          },
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fe.mp3?alt=media&token=f0bce1a2-ae62-4ea5-90cf-5f3e97f64b86",
                              "id": 0,
                              "isCorrect": true,
                              "text": "え"
                          }
                      ],
                      "text": "⬜き"
                  }
              ]
          },
          "story": {
              "story_count": 6,
              "story_image": {
                  "story_image_1": "",
                  "story_image_2": "",
                  "story_image_3": "",
                  "story_image_4": "",
                  "story_image_5": "",
                  "story_image_6": ""
              },
              "story_text": {
                  "story_text_1": "story text 01",
                  "story_text_2": "story text 02",
                  "story_text_3": "story text 03",
                  "story_text_4": "story text 04",
                  "story_text_5": "story text 05",
                  "story_text_6": "story text 06"
              }
          }
      },
      "act_2": {
          "choose_path": {
              "per_practice": {
                  "story_count": 1,
                  "story_image": {
                      "story_image_1": ""
                  },
                  "story_text": {
                      "story_text_1": "story text 01"
                  }
              },
              "post_practice": {
                  "correct_path": {
                      "story_count": 1,
                      "story_image": {
                          "story_image_1": ""
                      },
                      "story_text": {
                          "story_text_1": "story text 01"
                      }
                  },
                  "game": {
                      "answer": "えき",
                      "options": [
                          {
                              "audio": "",
                              "id": 0,
                              "image": "",
                              "isCorrect": true,
                              "text": "えき"
                          },
                          {
                              "audio": "",
                              "id": 1,
                              "image": "",
                              "isCorrect": false,
                              "text": "バス"
                          }
                      ],
                      "story_image_1": "",
                      "type": "sign"
                  }
              }
          },
          "practice": {
              "pronunciation": [
                  {
                      "answer": "a",
                      "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/character%2Fa.mp3?alt=media&token=045559a0-b36a-48a5-be1c-f478d6f25f8a",
                      "options": [
                          {
                              "id": 0,
                              "isCorrect": true,
                              "text": "e"
                          },
                          {
                              "id": 1,
                              "isCorrect": false,
                              "text": "i"
                          }
                      ],
                      "text": "え"
                  }
              ],
              "word": [
                  {
                      "answer": "E",
                      "meaning": "train station",
                      "options": [
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fe.mp3?alt=media&token=f0bce1a2-ae62-4ea5-90cf-5f3e97f64b86",
                              "id": 0,
                              "isCorrect": true,
                              "text": "E"
                          },
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fa.mp3?alt=media&token=276156ed-2f51-4787-832c-37492525020d",
                              "id": 1,
                              "isCorrect": false,
                              "text": "A"
                          }
                      ],
                      "text": "⬜ki"
                  },
                  {
                      "answer": "え",
                      "meaning": "train station",
                      "options": [
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fa.mp3?alt=media&token=276156ed-2f51-4787-832c-37492525020d",
                              "id": 1,
                              "isCorrect": false,
                              "text": "あ"
                          },
                          {
                              "audio": "https://firebasestorage.googleapis.com/v0/b/japanese-word-battle.appspot.com/o/missing_word%2Fe.mp3?alt=media&token=f0bce1a2-ae62-4ea5-90cf-5f3e97f64b86",
                              "id": 0,
                              "isCorrect": true,
                              "text": "え"
                          }
                      ],
                      "text": "⬜き"
                  }
              ]
          },
          "story": {
              "story_count": 6,
              "story_image": {
                  "story_image_1": "",
                  "story_image_2": "",
                  "story_image_3": "",
                  "story_image_4": "",
                  "story_image_5": "",
                  "story_image_6": ""
              },
              "story_text": {
                  "story_text_1": "story text 01",
                  "story_text_2": "story text 02",
                  "story_text_3": "story text 03",
                  "story_text_4": "story text 04",
                  "story_text_5": "story text 05",
                  "story_text_6": "story text 06"
              }
          }
      },
      "act_count": 2,
      "level": "level01_test",
      "reward": {
          "image": "",
          "prime_stamp": "",
          "stamp": ""
      }
  }
    console.log(quizData); // ตรวจสอบค่าที่ได้รับ
    console.log(quizData.act_1.story.story_text.story_text_1); // ตรวจสอบค่าที่ได้รับ
    console.log(targetText)
    const handlenext = () => {
      setnumber_story(number_story+1)
      settargetText("story_text_"+(number_story+1))
    };
return (
    <div>
      <div className="story_container">
        <div className="story_action">{quizData.act_1.story.story_text.story_img_1}</div>
        <div className="story_text">{quizData.act_1.story.story_text[targetText]}</div>
        <div className="confirm_block">
          <button className="confirm_button" onClick={handlenext} style={{marginTop: "1vh"}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Story;