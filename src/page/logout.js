import { auth } from "../firebase";

function LogoutUser({ setIsLogin, setuserdefine }) {
  const handleLogoutSuccess = () => {
    auth.signOut();
    setuserdefine({});
    setIsLogin(false);
  };
  return (
    <div onClick={handleLogoutSuccess}>
      <h2>Logout</h2>
    </div>
  );
}
export default LogoutUser;
