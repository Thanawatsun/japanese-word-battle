import "../css/quiz.css";
import ActSystem from "./act/act_system";
function StageSystem({
  setIsPlayer,
  modiflyQuiz,
  userdefine,
  stageplay,
  isContinue,
}) {
  var continuePlay = false;
  var continueGame = {};
  console.log(isContinue)
  return (
    <div>
      <div className="quiz_container">
        <div className="action_block">
          {isContinue.stage_playing_act !== undefined ? (
            <ActSystem
              modiflyQuiz={modiflyQuiz[stageplay]}
              Ispractice={false}
              Isstory={true}
              userdefine={userdefine}
              act_count={isContinue.stage_playing_act}
              life={isContinue.stage_playing_life}
              continuePlay={continuePlay}
              continueGame={continueGame}
            />
          ) : (
            <ActSystem
              modiflyQuiz={modiflyQuiz[stageplay]}
              Ispractice={false}
              Isstory={true}
              userdefine={userdefine}
              act_count={"act_1"}
              life={5}
              continuePlay={continuePlay}
              continueGame={continueGame}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default StageSystem;
