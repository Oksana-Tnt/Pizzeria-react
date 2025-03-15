import { pushToDb } from "@utils/authHelper";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    pushToDb("register", formData, false).then((accessData) => {
      localStorage.setItem("access_data", JSON.stringify(accessData));
      navigate("/login");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form mx-auto bg-body-tertiary p-5 border border-light-subtle rounded form_register"
    >
      <label>Name</label>
      <input
        type="name"
        className="form-control mb-4"
        name="name"
        placeholder="Enter your name"
      />
      <label>Email</label>
      <input
        type="email"
        className="form-control mb-4"
        name="email"
        placeholder="Enter your email"
      />
      <label>Password</label>
      <input
        type="password"
        className="form-control mb-4"
        name="password"
        placeholder="Enter your password"
      />
      <div className="text-center">
        <button className="btn btn-outline-info">Sign Up</button>
      </div>
    </form>
  );
};

export default RegisterForm;
