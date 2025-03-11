import { Suspense } from "react";
import NavBar from "../NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";

const Layout = ({ isLoggedIn, setIsLoggedIn, currentUser }) => {
  const location = useLocation();
  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
      />
      <Suspense>
        <Outlet />
      </Suspense>
      {location.pathname === "/menu" && <Footer />}
      {location.pathname === "/orders" && <Footer />}
    </>
  );
};

export default Layout;
