import { auth } from "../firebase";

function LogoutUser({ setIsLogin, setuserdefine }) {
  const handleLogoutSuccess = () => {
    auth.signOut();
    setuserdefine({});
    setIsLogin(false);
  };
  return (
    <div>
      <div variant="secondary" onClick={handleLogoutSuccess}>
        logout
      </div>
    </div>
  );
}
export default LogoutUser;
