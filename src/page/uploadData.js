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

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="jsonFileInput" onChange={handleFileChange} />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Upload</button>
    </form>
  );
}

export default TermUploadForm;
