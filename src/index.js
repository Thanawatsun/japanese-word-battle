import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TermUploadForm from './page/uploadData';
import reportWebVitals from './reportWebVitals';
import WordBank from "./page/wordbank";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <TermUploadForm/>
<WordBank/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
