import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {auth, provider, app} from '../firebase';
//import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


function LoginUser({ setIsLogin }) {
    const [credential, setCredential] = useState()
    useEffect(() => {
        if (credential != null){
            alert("welcome")
            console.log(credential)
            
        }
    }, [credential])
    auth.onAuthStateChanged((user) =>{
        console.log(user)
        if (user != null){
            handleLoginSuccess()
        }
        if (user == null){
            handleLogoutSuccess()
        }
    })
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result) =>{
            setCredential(GoogleAuthProvider.credentialFromResult(result));
            console.log(result.user)
            uploadDataToFirestore(result.user)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const checkcredential = () =>{
        console.log(credential)
        
    }
    const handleLoginSuccess = () => {
        setIsLogin(true); // เรียก callback เพื่ออัปเดต state ใน parent component
      };
      const handleLogoutSuccess = () => {
        setIsLogin(false);
      };
      async function uploadDataToFirestore(user) {
        console.log(user.uid)
        const db = getFirestore(app);
        const term = user.uid;
        const termRef = doc(db, 'user_data', term);
        
        // Store basic term data
        await setDoc(termRef, {
          UID: user.uid, 
          email: user.email,
          username: user.displayName
        });
    }
    return(
        <div>
            <button onClick={checkcredential}> checkcredential</button>
            <button onClick={signInWithGoogle}> Sign In With Google</button>
        </div>
    )
}
export default LoginUser;