import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./components/pages/Menu";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import AboutUs from "./components/pages/AboutUs";
import Register from "./components/pages/Register";
import { useEffect, useState } from "react";
import { getUser, isUserLoggedIn } from "./utils/authHelper";
import Home from "./components/pages/Home";
import Orders from "./components/pages/Orders";

import ProtectedUserRoute from "./components/ProtectedUserRoute";
import Details from "./components/pages/Details";
import DashboardLayout from "./components/pages/DashboardLayout";
import Ingredients from "./components/pages/Ingredients";
import Categories from "./components/pages/Categories";
import Layout from "./components/pages/Layout";

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
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
