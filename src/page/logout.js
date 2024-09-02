import {auth} from '../firebase';
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