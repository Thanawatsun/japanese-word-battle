import { app } from "../firebase"; // Import your Firebase configuration
import { getDatabase, ref, update, onValue } from "firebase/database";
function SetReward(userId, LifePoint) {
  const db = getDatabase(app);
  const termRef = ref(
    db,
    "User_Data/" + userId
  );
  update(termRef, {
    stage_playing_life: LifePoint,
  });
}
export default SetReward;
