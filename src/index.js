import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TermUploadForm from "./page/uploadData";
//import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = "JAPANESE WORD BATTLE";
root.render(
  <>
    <App />
    <TermUploadForm/>
  </>
);

//reportWebVitals();
