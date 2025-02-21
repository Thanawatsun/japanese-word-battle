import "../css/quiz.css";
import ActSystem from "./act/act_system";
function StageSystem({ setIsPlayer, modiflyQuiz, userdefine, stageplay }) {
  var continuePlay = false;
  var continueGame = {};
  return (
    <div>
      <div className="quiz_container">
        <div className="action_block">
          (
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
          )
        </div>
      </div>
    </div>
  );
}
export default StageSystem;
