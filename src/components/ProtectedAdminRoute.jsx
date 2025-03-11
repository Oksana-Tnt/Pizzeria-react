import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const accessData = JSON.parse(localStorage.getItem("access_data"));
  if (accessData.user.name !== "admin") {
    return <Navigate to="/orders" />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedAdminRoute;
