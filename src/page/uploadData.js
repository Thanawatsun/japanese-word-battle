import React, { useState } from "react";
import { app } from "../firebase";
import { getDatabase, ref, update } from "firebase/database";

function TermUploadForm() {
  const initialFormData = {
    ID: 1000000,
    forms: [["ヽ"]],
    spelling: "ヽ",
    tags: [
      {
        name: "unc",
        meaning: "repetition mark in katakana",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        // จัดกลุ่มข้อมูลตาม Spelling
        const groupedData = {};
        var termBank = [];
        jsonData.forEach((row) => {
          const spelling = row[1];
          if (!groupedData[spelling]) {
            groupedData[spelling] = [];
          }
          groupedData[spelling].push(row);
        });
        for (const spelling in groupedData) {
          var formsSet = new Set();
          const rows = groupedData[spelling];
          const firstRow = rows[0]; // ใช้ข้อมูลจากแถวแรกของกลุ่ม
          if (firstRow[6] >= 1000000) {
            rows.map((row) => addForms(row[0]));
            termBank.push({
              ID: firstRow[6],
              forms: Array.from(formsSet),
              spelling: spelling,
              tags: rows.map((row) => ({
                name: row[2], // ใช้ข้อมูลจาก row[2] เป็น name
                meaning: meaningdata(row),
                form: row[0],
              })), // Dynamically add type property with extracted data
            });
            function meaningdata(row) {
              var extractedData = row[5];
              if (row[6] >= 100030) {
                //unc
                if (row[2].includes("unc")) {
                  //var extractedData = row[5][0].content[0].content.content;
                  extractedData = row[5];
                  var test = typeof row[5][0];
                  if (test === "object") {
                    if (row[5][0].content[0] !== undefined) {
                      extractedData = row[5][0].content[0].content.content;
                      if (row[5][0].content[0].content[0] !== undefined) {
                        extractedData = [];
                        for (var key in row[5][0].content[0].content) {
                          //extractedData += row[5][0].content[0].content[key].content
                          extractedData.splice(
                            key,
                            0,
                            row[5][0].content[0].content[key].content
                          );
                        }
                      }
                    } else if (
                      row[5][0].content.content.content !== undefined
                    ) {
                      extractedData = row[5][0].content.content.content;
                    }
                  }
                } else if (row[2].includes("n")) {
                  extractedData = row[5];
                  if (row[5][0].content !== undefined) {
                    //var extractedData = row[5][0].content[0].content.content
                    if (typeof row[5][0] == Array) {
                      if (row[5][0].content[0].content[0] !== undefined) {
                        extractedData = [];
                        for (key in row[5][0].content[0].content) {
                          //extractedData += row[5][0].content[0].content[key].content
                          extractedData.splice(
                            key,
                            0,
                            row[5][0].content[0].content[key].content
                          );
                        }
                      } else if (row[5][0].content[0].content !== undefined) {
                        extractedData = row[5][0].content[0].content.content;
                      }
                    } else if (typeof row[5] == Object) {
                      if (row[5][0].content.content.content !== undefined) {
                        extractedData = row[5][0].content.content.content;
                      }
                    }
                  }
                } else if (row[2].includes("forms")) {
                  if (row[5][0].content !== undefined) {
                    if (row[5][0].content.content[1] !== undefined) {
                      extractedData = [];
                      for (key in row[5][0].content.content[1].content) {
                        extractedData.splice(
                          key,
                          0,
                          row[5][0].content.content[1].content[key].content
                        );
                      }
                    }
                  }
                }
                if (typeof row[5] == Array) {
                  if (row[5][0].content[0].content !== undefined) {
                    extractedData = [];
                    for (key in row[5][0].content[0].content) {
                      extractedData.splice(
                        key,
                        0,
                        row[5][0].content[0].content[key].content
                      );
                    }
                  }
                } else if (row[5][0].content !== undefined) {
                  extractedData = row[5];
                  if (typeof row[5] == Array) {
                    if (row[5][0].content[0].content !== undefined) {
                      if (row[5][0].content[0].content.content !== undefined) {
                        extractedData = row[5][0].content[0].content.content;
                      } else {
                        extractedData = [];
                        for (key in row[5][0].content[0].content) {
                          extractedData.splice(
                            key,
                            0,
                            row[5][0].content[0].content[key].content
                          );
                        }
                      }
                    }
                  }
                }
                return extractedData;
              }
              return extractedData;
            }
          }
          //console.log(termBank)
          //console.log(cells)
        }
        function addForms(word) {
          formsSet.add(word);
        }
        console.log(termBank);
        setFormData(termBank);
        setErrorMessage(null); // Clear any previous errors
      } catch (error) {
        setErrorMessage("Error parsing JSON file. Please check the format.");
        setFormData(null); // Reset form data if invalid JSON
      }
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData) {
      setErrorMessage("Please upload a valid JSON file.");
      return;
    }

    try {
      console.log(formData);
      await uploadDataToRealtimeDatabase(formData);
      setErrorMessage(null); // Clear any previous errors
      setFormData(null); // Reset form data after successful upload
    } catch (error) {
      console.error("Error uploading data:", error);
      setErrorMessage("Error uploading data. Please try again.");
    }
  };
  const handleSubmitTest = async (event) => {
    event.preventDefault();

    if (!formData) {
      setErrorMessage("Please upload a valid JSON file.");
      return;
    }

    try {
      console.log(formData);
      await uploadDataLevel(formData);
      setErrorMessage(null); // Clear any previous errors
      setFormData(null); // Reset form data after successful upload
    } catch (error) {
      console.error("Error uploading data:", error);
      setErrorMessage("Error uploading data. Please try again.");
    }
  };

  async function uploadDataToRealtimeDatabase(allData) {
    const db = getDatabase(app); // Use getDatabase for Realtime Database

    try {
      for (const data of allData) {
        const term = data.spelling;
        const termRef = ref(db, "term_bank/" + term); // Construct reference path

        // Create or update data with update() for flexibility
        await update(termRef, {
          ID: data.ID,
          forms: data.forms,
          spelling: data.spelling,
          tag: data.tags,
        });

        console.log("Data updated for");
      }

      console.log("All data uploaded to Realtime Database");
    } catch (e) {
      console.error("Error updating data:", e);
      throw e; // Re-throw for further handling
    }
  }

  async function uploadDataLevel() {
    const shuffleArray = (array) => {
      return array
        .map((item) => ({ ...item, sort: Math.random() })) // Add random sort key
        .sort((a, b) => a.sort - b.sort) // Sort based on the random key
        .map(({ sort, ...item }) => item); // Remove the sort key
    };
    const db = getDatabase(app); // Use getDatabase for Realtime Database
    var allData = [
      {
        level: "level01",
        character: [
          {
            text: "あ, ア",
            options: shuffleArray([
              { id: 0, text: "a", isCorrect: true },
              { id: 1, text: "i", isCorrect: false },
              { id: 2, text: "u", isCorrect: false },
              { id: 3, text: "e", isCorrect: false },
              { id: 4, text: "o", isCorrect: false },
            ]),
          },
          {
            text: "い, イ",
            options: shuffleArray([
              { id: 0, text: "a", isCorrect: false },
              { id: 1, text: "i", isCorrect: true },
              { id: 2, text: "u", isCorrect: false },
              { id: 3, text: "e", isCorrect: false },
              { id: 4, text: "o", isCorrect: false },
            ]),
          },
          {
            text: "う, ウ",
            options: shuffleArray([
              { id: 0, text: "a", isCorrect: false },
              { id: 1, text: "i", isCorrect: false },
              { id: 2, text: "u", isCorrect: true },
              { id: 3, text: "e", isCorrect: false },
              { id: 4, text: "o", isCorrect: false },
            ]),
          },
          {
            text: "え, エ",
            options: shuffleArray([
              { id: 0, text: "a", isCorrect: false },
              { id: 1, text: "i", isCorrect: false },
              { id: 2, text: "u", isCorrect: false },
              { id: 3, text: "e", isCorrect: true },
              { id: 4, text: "o", isCorrect: false },
            ]),
          },
          {
            text: "お, オ",
            options: shuffleArray([
              { id: 0, text: "a", isCorrect: false },
              { id: 1, text: "i", isCorrect: false },
              { id: 2, text: "u", isCorrect: false },
              { id: 3, text: "e", isCorrect: false },
              { id: 4, text: "o", isCorrect: true },
            ]),
          },
        ],

        Missing_Word: [
          {
            text: "⬜き (eki)",
            story: "where is the train station?",
            meaning: "train station",
            options: shuffleArray([
              { id: 0, text: "え", isCorrect: true },
              { id: 1, text: "あ", isCorrect: false },
              { id: 2, text: "い", isCorrect: false },
              { id: 3, text: "お", isCorrect: false },
            ]),
          },
          {
            text: "⬜りぐち (iriguchi)",
            story: "Which signs should I follow?",
            meaning: "entry gate",
            options: shuffleArray([
              { id: 0, text: "い", isCorrect: true },
              { id: 1, text: "え", isCorrect: false },
              { id: 2, text: "あ", isCorrect: false },
              { id: 3, text: "う", isCorrect: false },
            ]),
          },
          {
            text: "⬜しあげまで(Oshiage)",
            story: "what name station i go?",
            meaning: "To Oshiage",
            options: shuffleArray([
              { id: 0, text: "お", isCorrect: true },
              { id: 1, text: "え", isCorrect: false },
              { id: 2, text: "あ", isCorrect: false },
              { id: 3, text: "う", isCorrect: false },
            ]),
          },
          {
            text: "⬜くら (ikura)",
            story: "what word meaning 'how much'?",
            meaning: "how much",
            options: shuffleArray([
              { id: 0, text: "い", isCorrect: true },
              { id: 1, text: "え", isCorrect: false },
              { id: 2, text: "あ", isCorrect: false },
              { id: 3, text: "う", isCorrect: false },
            ]),
          },
          {
            text: "ちゅう⬜⬜ぐち (Cyuuouguchi)",
            story: "Which signs should I follow to exit?",
            meaning: "central exit",
            options: shuffleArray([
              { id: 0, text: "おう", isCorrect: true },
              { id: 1, text: "おい", isCorrect: false },
              { id: 2, text: "あえ", isCorrect: false },
              { id: 3, text: "あう", isCorrect: false },
            ]),
          },
          {
            text: "スカ⬜ツリー (sukaitsuri)",
            story: "What is Skytree in Japanese?",
            meaning: "Skytree",
            options: shuffleArray([
              { id: 0, text: "い", isCorrect: true },
              { id: 1, text: "え", isCorrect: false },
              { id: 2, text: "あ", isCorrect: false },
              { id: 3, text: "う", isCorrect: false },
            ]),
          },
        ],
        Correct_Word: [
          {
            text: "えき",
            story: "where is the train station?",
            meaning: "train station",
            options: shuffleArray([
              { id: 0, text: "eki", isCorrect: true },
              { id: 1, text: "aki", isCorrect: false },
              { id: 2, text: "ei", isCorrect: false },
              { id: 3, text: "ou", isCorrect: false },
            ]),
          },
          {
            text: "いりぐち",
            story: "Which signs should I follow?",
            meaning: "entry gate",
            options: shuffleArray([
              { id: 0, text: "iriguchi", isCorrect: true },
              { id: 1, text: "ariguchi", isCorrect: false },
              { id: 2, text: "origuchi", isCorrect: false },
              { id: 3, text: "uriguchi", isCorrect: false },
            ]),
          },
          {
            text: "おしあげ",
            story: "what name station i go?",
            meaning: "Oshiage",
            options: shuffleArray([
              { id: 0, text: "Oshiage", isCorrect: true },
              { id: 1, text: "Ningyōchō", isCorrect: false },
              { id: 2, text: "ashiade", isCorrect: false },
              { id: 3, text: "ishiite", isCorrect: false },
            ]),
          },
          {
            text: "いくら",
            story: "what word meaning 'how much'?",
            meaning: "how much",
            options: shuffleArray([
              { id: 0, text: "ikura", isCorrect: true },
              { id: 1, text: "arugu", isCorrect: false },
              { id: 2, text: "akura", isCorrect: false },
              { id: 3, text: "iruga", isCorrect: false },
            ]),
          },
          {
            text: "ちゅうおうぐち",
            story: "Which signs should I follow to exit?",
            meaning: "central exit",
            options: shuffleArray([
              { id: 0, text: "Cyuuouguchi", isCorrect: true },
              { id: 1, text: "Chiguguchi", isCorrect: false },
              { id: 2, text: "kitaguchi", isCorrect: false },
              { id: 3, text: "minamiguchi", isCorrect: false },
            ]),
          },
          {
            text: "スカイツリー ",
            story: "What is Skytree in Japanese?",
            meaning: "Skytree",
            options: shuffleArray([
              { id: 0, text: "sukaitsuri", isCorrect: true },
              { id: 1, text: "kusaisori", isCorrect: false },
              { id: 2, text: "asobini", isCorrect: false },
              { id: 3, text: "sokuisoru", isCorrect: false },
            ]),
          },
        ],

        matching: {
          matchQuz: [
            {
              id: 1,
              text: "えき",
              type: "word",
              matched: false,
            },
            {
              id: 2,
              text: "いりぐち",
              type: "word",
              matched: false,
            },
            {
              id: 3,
              text: "おしあげ",
              type: "word",
              matched: false,
            },
            {
              id: 4,
              text: "いくら",
              type: "word",
              matched: false,
            },
            {
              id: 5,
              text: "ちゅうおうぐち",
              type: "word",
              matched: false,
            },
            {
              id: 6,
              text: "スカイツリー",
              type: "word",
              matched: false,
            },
          ],
          matchAns: [
            {
              id: 1,
              text: "Train station",
              type: "meaning",
              matched: false,
            },
            {
              id: 2,
              text: "Entry gate",
              type: "meaning",
              matched: false,
            },
            {
              id: 3,
              text: "Oshiage",
              type: "meaning",
              matched: false,
            },
            {
              id: 4,
              text: "How much",
              type: "meaning",
              matched: false,
            },
            {
              id: 5,
              text: "Central exit",
              type: "meaning",
              matched: false,
            },
            {
              id: 6,
              text: "Skytree",
              type: "meaning",
              matched: false,
            },
          ],
        },
      },
    ];
    try {
      for (const data of allData) {
        const term = data.level;
        const termRef = ref(db, "Game_Level/" + term); // Construct reference path

        // Create or update data with update() for flexibility
        await update(termRef, {
          Quizcharacter: data.character,
          QuizMissing_Word: data.Missing_Word,
          QuizCorrect_Word: data.Correct_Word,
          Quizmatching: data.matching,
        });

        console.log("Data updated for");
      }

      console.log("All data uploaded to Realtime Database");
    } catch (e) {
      console.error("Error updating data:", e);
      throw e; // Re-throw for further handling
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" id="jsonFileInput" onChange={handleFileChange} />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Upload</button>
      </form>
      <form onSubmit={handleSubmitTest}>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default TermUploadForm;
