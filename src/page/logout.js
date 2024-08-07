import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {auth, provider} from '../firebase';
function LogoutUser({ setIsLogin })  {

    const handleLogoutSuccess = () => {
        auth.signOut()
        setIsLogin(false);
      };
      return(
        <div>
            <button onClick={handleLogoutSuccess}> logout</button>
        </div>
      )
  }
export default LogoutUser;