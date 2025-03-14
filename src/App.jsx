import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { getUser, isUserLoggedIn } from "./utils/authHelper";

const Menu = React.lazy(() => import("./components/pages/Menu"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Dashboard = React.lazy(() => import("./components/pages/Dashboard"));
const AboutUs = React.lazy(() => import("./components/pages/AboutUs"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Home = React.lazy(() => import("./components/pages/Home"));
const Orders = React.lazy(() => import("./components/pages/Orders"));
const Details = React.lazy(() => import("./components/pages/Details"));
const DashboardLayout = React.lazy(() =>
  import("./components/pages/DashboardLayout")
);
const Ingredients = React.lazy(() => import("./components/pages/Ingredients"));
const Categories = React.lazy(() => import("./components/pages/Categories"));
const Layout = React.lazy(() => import("./components/pages/Layout"));
const ProtectedUserRoute = React.lazy(() =>
  import("./components/ProtectedUserRoute")
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    const user = getUser();
    if (user) {
      setCurrentUser(user.name);
    }
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                currentUser={currentUser}
              />
            }
          >
            <Route path="/" element={<Home />}>
              Home
            </Route>
            <Route path="/menu" element={<Menu />}>
              Menu
            </Route>
            <Route path="/menu/:id" element={<Details />}>
              Details
            </Route>
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  element={
                    <Login
                      stateCallback={setIsLoggedIn}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                >
                  Login
                </Route>
                <Route path="/register" element={<Register />}>
                  Register
                </Route>
              </>
            )}
            <Route
              path="/orders"
              element={
                <ProtectedUserRoute>
                  <Orders />
                </ProtectedUserRoute>
              }
            >
              Orders
            </Route>

            <Route path="/about" element={<AboutUs />}>
              About Us
            </Route>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />|
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
