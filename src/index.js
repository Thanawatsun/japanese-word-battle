import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Story from "./quiz/act/story/story_system";
import Practice from "./quiz/act/practice/practice_system"
import Game from "./quiz/act/game_choose_path/game_system"
import Endact from "./quiz/act/story/story_post_practice"
import Reward from "./quiz/act//game_choose_path/game_system"
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
        <Route path="/practice" element={<Practice />} />
        <Route path="/game" element={<Game />} />
        <Route path="/endact" element={<Endact />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
    </BrowserRouter>
    <TermUploadForm />
  </>
);

//reportWebVitals();
