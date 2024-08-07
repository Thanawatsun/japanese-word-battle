import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBKZ9qbKo4YRtjMwvK4LcCF54-m_ZMavSc",
    authDomain: "japanese-word-battle.firebaseapp.com",
    databaseURL: "https://japanese-word-battle-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "japanese-word-battle",
    storageBucket: "japanese-word-battle.appspot.com",
    messagingSenderId: "936660245889",
    appId: "1:936660245889:web:968a958904de9332609c80",
    measurementId: "G-DYTEZJ7XTH"
  };
  const app = initializeApp(firebaseConfig); // Initialize Firebase app

  
function TermUploadForm() {
  
    const initialFormData = {
      "ID": 1000000,
      "forms": [
          [
              "ヽ"
          ]
      ],
      "spelling": "ヽ",
      "tags": [
          {
              "name": "unc",
              "meaning": "repetition mark in katakana"
          }
      ]
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
          jsonData.forEach(row => {
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
              if (firstRow[6] >= 1000000){
                rows.map(row => addForms(row[0]))
              termBank.push({
                ID: firstRow[6],
                forms: Array.from(formsSet),
                spelling: spelling,
                  tags: rows.map(row => ({ 
                      name: row[2], // ใช้ข้อมูลจาก row[2] เป็น name
                      meaning: meaningdata(row)
                    })), // Dynamically add type property with extracted data
              });
              function meaningdata(row){
                  const type = row[2];
              const casNumber = row[4];
              const meaning = row[5][0];
              const typeData = row[5][0].type
              var extractedData = row[5]
              var note = ""
              var id = row[6]
              var Spelling = row[1]
              var word = row[0]
              var type_word = row[2]
              var termBank = [];
              if (row[6] >= 100030){
                  //unc
                  if (row[2].includes("unc")) {
                      //var extractedData = row[5][0].content[0].content.content;
                      var extractedData = row[5]
                      var test = typeof(row[5][0])
                      if (test == 'object'){
                          var obj = row[5][0].content[0]
                          if (row[5][0].content[0] != undefined){
                              var extractedData = row[5][0].content[0].content.content
                              if (row[5][0].content[0].content[0] != undefined){
                                  var extractedData = []
                                  for (var key in row[5][0].content[0].content) {
                                      //extractedData += row[5][0].content[0].content[key].content
                                      extractedData.splice(key, 0, row[5][0].content[0].content[key].content)
                                    }
                              }
                          }
                          else if (row[5][0].content.content.content != undefined){
                              var extractedData = row[5][0].content.content.content
                          }
                      }

                  }
                  else if (row[2].includes("n")) {
                      
                      var extractedData = row[5]
                      if (row[5][0].content != undefined){
                          //var extractedData = row[5][0].content[0].content.content
                          if (row[5][0].content[0].content[0] != undefined){
                              var extractedData = []
                              for (key in row[5][0].content[0].content) {
                                  //extractedData += row[5][0].content[0].content[key].content
                                  extractedData.splice(key, 0, row[5][0].content[0].content[key].content)
                                }
                          }
                          else if (row[5][0].content[0].content != undefined){
                              var extractedData = row[5][0].content[0].content.content
                          }
                      }
                  }
                  else if (row[2].includes("forms")) {

                      if (row[5][0].content != undefined){
                          if (row[5][0].content.content[1] != undefined){
                              var extractedData = []
                              for (key in row[5][0].content.content[1].content) {
                                      extractedData.splice(key, 0, row[5][0].content.content[1].content[key].content)
                                  }
                          } 
                      }
                  }
                  else if (row[5][0].content != undefined){
                      var extractedData = row[5]
                      if (row[5][0].content[0].content != undefined){
                        if (row[5][0].content[0].content.content != undefined){
                            var extractedData = row[5][0].content[0].content.content
                        }else{
                            var extractedData = []
                            for (key in row[5][0].content[0].content) {
                                    extractedData.splice(key, 0, row[5][0].content[0].content[key].content)
                                } 
                        }

                    }
                  }
                  return extractedData
              }
              return extractedData
          }}
              //console.log(termBank)
              //console.log(cells)
          }
          function addForms(word){
            formsSet.add(word)
          }
          console.log(termBank)
          setFormData(termBank)
          setErrorMessage(null); // Clear any previous errors
        } catch (error) {
          setErrorMessage("Error parsing JSON file. Please check the format.");
          setFormData(null); // Reset form data if invalid JSON
        }
      };
  
      reader.readAsText(file);
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleTagChange = (index, field, value) => {
      const updatedTags = [...formData.tags];
      updatedTags[index][field] = value;
      setFormData({ ...formData, tags: updatedTags });
    };
  
    const addTag = () => {
      setFormData({ ...formData, tags: [...formData.tags, { name: '', meaning: [] }] });
    };
  
    const removeTag = (index) => {
      const updatedTags = formData.tags.filter((_, i) => i !== index);
      setFormData({ ...formData, tags: updatedTags });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!formData) {
        setErrorMessage("Please upload a valid JSON file.");
        return;
      }
  
      try {
        console.log(formData)
        await uploadDataToFirestore(formData);
        setErrorMessage(null); // Clear any previous errors
        setFormData(null); // Reset form data after successful upload
      } catch (error) {
        console.error("Error uploading data:", error);
        setErrorMessage("Error uploading data. Please try again.");
      }
    };
  
    async function uploadDataToFirestore(allData) {
      const db = getFirestore(app);
    
      try {
        
    console.log("update");
        // Iterate directly over the array of objects (assuming allData is the array)
        for (const data of allData) { 
          const term = data.spelling; // Assuming each object has a 'spelling' property
          const termRef = doc(db, 'term_bank', term);
          
          // Store basic term data
          await setDoc(termRef, {
            ID: data.ID, 
            forms: data.forms,
            spelling: data.spelling
          });
    
          // Handle tags - adjust to match the actual data structure
          if (data.tags && Array.isArray(data.tags)) { 
            for (const tagData of data.tags) {
              const tagRef = doc(termRef, 'tags', tagData.name); 
              await setDoc(tagRef, {
                meaning: tagData.meaning,  
              });
            }
          } else if (data.tags) { 
            // Handle the case where tags is not an array (e.g., a single object)
            const tagRef = doc(termRef, 'tags', data.tags.name);
            await setDoc(tagRef, {
              meaning: data.tags.meaning
            })
          }
        
        }
        console.log("Documents updated");
    
      } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
      }
    }
    
    
  
    return (

      <form onSubmit={handleSubmit}>
      <input type="file" id="jsonFileInput" onChange={handleFileChange} />
      {/* ... (optional input fields for manual data entry) */}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Upload</button>
    </form>
    );
  }

export default TermUploadForm;
