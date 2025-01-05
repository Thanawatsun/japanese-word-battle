import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Story from "./quiz/act/story/story";
import TermUploadForm from "./page/uploadData";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = "JAPANESE WORD BATTLE";

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </BrowserRouter>
    <TermUploadForm />
  </>
);

//reportWebVitals();
