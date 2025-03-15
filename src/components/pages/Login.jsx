import LoginForm from "../LoginForm";

const Login = ({ stateCallback, setCurrentUser }) => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="text-center text-body-secondary mb-3">log In</h1>
        <LoginForm
          stateCallback={stateCallback}
          setCurrentUser={setCurrentUser}
        />
      </div>
    </div>
  );
};

export default Login;
