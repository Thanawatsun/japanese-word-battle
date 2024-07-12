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

async function uploadDataToFirestore(data) {
  const db = getFirestore(app); // Get Firestore instance INSIDE the function

  try {
    const term = data.spelling;
    const termRef = doc(db, 'term_bank', term);

    await setDoc(termRef, {
      ID: data.ID,
      forms: data.forms,
      spelling: data.spelling
    });

    for (const tagData of data.tags) {
      const tagRef = doc(termRef, 'tag', tagData.name);
      await setDoc(tagRef, { meaning: tagData.meaning });
    }

    console.log("Document updated with ID: ", termRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
  
function TermUploadForm() {
    const initialFormData = {
      ID: 1001140,
      forms: ["ええ", "えー"],
      spelling: "ええ",
      tags: [
        { name: "1 int", meaning: ["yes", "that is correct", "right"] },
        { name: "2 int", meaning: ["that's right", "that is so"] },
        { name: "5 adj-f ksb", meaning: ["good", "fine", "all right"] }
      ]
    };
  
    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState(null);
  
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
      setErrorMessage(null);
  
      try {
        await uploadDataToFirestore(formData);
        setFormData(initialFormData); // รีเซ็ตฟอร์ม
      } catch (error) {
        console.error("Error uploading data:", error);
        setErrorMessage("Error uploading data. Please try again.");
      }
    };
  
    async function uploadDataToFirestore(data) {
      const db = getFirestore(app);
  
      try {
        console.log("update")
        const term = data.spelling;
        const termRef = doc(db, 'term_bank', term);
    
        await setDoc(termRef, {
          ID: data.ID,
          forms: data.forms,
          spelling: data.spelling
        });
    
        for (const tagData of data.tags) {
          const tagRef = doc(termRef, 'tag', tagData.name);
          await setDoc(tagRef, { meaning: tagData.meaning });
        }
    
        console.log("Document updated with ID: ", termRef.id);
      } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ID">ID:</label>
          <input type="text" id="ID" name="ID" value={formData.ID} onChange={handleInputChange} />
        </div>
  
        <div>
          <label htmlFor="forms">Forms (comma-separated):</label>
          <input 
            type="text" 
            id="forms" 
            name="forms" 
            value={formData.forms.join(', ')} 
            onChange={(e) => setFormData({ ...formData, forms: e.target.value.split(', ') })} 
          />
        </div>
  
        <div>
          <label htmlFor="spelling">Spelling:</label>
          <input type="text" id="spelling" name="spelling" value={formData.spelling} onChange={handleInputChange} />
        </div>
  
        <h3>Tags</h3>
        {formData.tags.map((tag, index) => (
          <div key={index}>
            <input 
              type="text" 
              placeholder="Tag Name" 
              value={tag.name} 
              onChange={(e) => handleTagChange(index, 'name', e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Meaning (comma-separated)" 
              value={tag.meaning.join(', ')}
              onChange={(e) => handleTagChange(index, 'meaning', e.target.value.split(', '))} 
            />
            <button type="button" onClick={() => removeTag(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTag}>Add Tag</button>
  
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  
        <button type="submit">Upload</button>
      </form>
    );
  }

export default TermUploadForm;
