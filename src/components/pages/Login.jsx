import { pushToDb } from "@utils/authHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ stateCallback, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    pushToDb("login", formData, false).then((accessData) => {
      if (accessData) {
        localStorage.setItem("access_data", JSON.stringify(accessData));
        stateCallback(true);
        setCurrentUser(accessData.user.name);
        if (accessData.user.name === "admin") {
          navigate(`/dashboard?user=${accessData.user.name}`);
        } else {
          navigate(`/orders?user=${accessData.user.name}`);
        }
      } else {
        toast("Invalid credentials!");
      }
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="text-center text-body-secondary mb-3">log In</h1>
        <form
          onSubmit={handleSubmit}
          className="form mx-auto bg-body-tertiary p-5 border border-light-subtle rounded form_login"
        >
          <label>Email</label>
          <input
            type="email"
            className="form-control mb-4"
            name="email"
            placeholder="Enter youe email"
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control mb-4"
            name="password"
            placeholder="Enter your password"
          />
          <div className="text-center">
            <button className="btn btn-outline-info">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
