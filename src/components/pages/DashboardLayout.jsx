import { Outlet } from "react-router-dom";
import NavBarDashboard from "../NavBarDashboard";
import { Suspense } from "react";

const DashboardLayout = () => {
  return (
    <div className="section">
      <div className="container">
        <NavBarDashboard />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default DashboardLayout;
