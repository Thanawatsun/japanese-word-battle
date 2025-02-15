import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider, app } from "../firebase";
//import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, update, onValue } from "firebase/database";
import PlaySound from "../component/PlaySound";
import "../css/login.css";
// import Button from "react-bootstrap/Button";

function LoginUser({ setIsLogin, setuserdefine }) {
  const [credential, setCredential] = useState();
  useEffect(() => {
    if (credential != null) {
      alert("welcome");
      console.log(credential);
    }
  }, [credential]);
  auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user != null) {
      handleLoginSuccess();
      setuserdefine({
        uid: user.uid,
        username: user.displayName,
      });
    }
    if (user == null) {
      handleLogoutSuccess();
    }
  });
  const signInWithGoogle = () => {
    PlaySound("button");
    signInWithPopup(auth, provider)
      .then((result) => {
        setCredential(GoogleAuthProvider.credentialFromResult(result));
        console.log(result.user);
        uploadtorealtime(result.user);
        //uploadDataToFirestore(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
  const checkcredential = () => {
    console.log(credential);
  };*/
  const handleLoginSuccess = () => {
    setIsLogin(true); // เรียก callback เพื่ออัปเดต state ใน parent component
  };
  const handleLogoutSuccess = () => {
    setIsLogin(false);
  };
  async function uploadDataToFirestore(user) {
    console.log(user.uid);
    const db = getFirestore(app);
    const term = user.uid;
    const termRef = doc(db, "user_data", term);

    // Store basic term data
    await setDoc(termRef, {
      UID: user.uid,
      email: user.email,
      username: user.displayName,
    });
  }
  async function uploadtorealtime(user) {
    const db = getDatabase(app);
    try {
      const term = user.uid;
      setuserdefine({
        uid: user.uid,
        username: user.displayName,
      });
      const termRef = ref(db, "User_Data/" + term);
      const userphotoURL = user.photoURL.slice(0, user.photoURL.length);
      const databaseRef = ref(getDatabase(app), `User_Data/` + term);
      onValue(databaseRef, async (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
          await update(termRef, {
            username: user.displayName,
            uid: user.uid,
            useremail: user.email,
            user_profile: userphotoURL,
            user_score: 0,
            learning_level: "Rank 0 None-level",
            user_stage: 0,
            userBankword: [""],
          });
        }
      });
    } catch (e) {
      console.error("Error updating data:", e);
      throw e;
    }
  }
  return (
    <div className="main-container">
      <div className="main-box">
        <h1 className="login-main-text">Japanese Word Battle</h1>
        <div className="login-button-box">
          <button className="login-button" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginUser;
