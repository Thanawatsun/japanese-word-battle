import { auth } from "../firebase";
import Button from "react-bootstrap/Button";
function LogoutUser({ setIsLogin, setuserdefine }) {
  const handleLogoutSuccess = () => {
    auth.signOut();
    setuserdefine({});
    setIsLogin(false);
  };
  return (
    <div>
      <Button variant="secondary" onClick={handleLogoutSuccess}>
        logout
      </Button>
    </div>
  );
}
export default LogoutUser;
