import {auth} from '../firebase';
function LogoutUser({ setIsLogin, setuserdefine })  {

    const handleLogoutSuccess = () => {
        auth.signOut()
        setuserdefine({})
        setIsLogin(false);
      };
      return(
        <div>
            <button onClick={handleLogoutSuccess}> logout</button>
        </div>
      )
  }
export default LogoutUser;