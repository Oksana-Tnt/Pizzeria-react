import { logout } from "@utils/authHelper";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handlerLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/menu");
  };
  return (
    <button className="btn btn-outline-success" onClick={handlerLogout}>
      Log out
    </button>
  );
};
export default Logout;
