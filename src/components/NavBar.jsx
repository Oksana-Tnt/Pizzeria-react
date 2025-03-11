import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";
import { BsCart4 } from "react-icons/bs";
import { useAppContextOrder } from "./context";
import { useState } from "react";
import Cart from "./Cart";
import NavBarMobile from "./NavBarMobile";
import SearchComponent from "./SearchComponent";

const NavBar = ({ isLoggedIn, setIsLoggedIn, currentUser }) => {
  const { ordersQuantity } = useAppContextOrder();
  const [showCart, setShowCart] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const location = useLocation();
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md bg-body-tertiary mb-4 px-2 py-0 fixed-top">
        <div className="container-fluid">
          <Link className="nav-link active" aria-current="/" to="/">
            <img src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMobile(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 d-flex gap-3">
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/" ? "menu current" : "menu"
                  }
                  aria-current="/"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/menu" ? "menu current" : "menu"
                  }
                  aria-current="/menu"
                  to="/menu"
                >
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/about" ? "menu current" : "menu "
                  }
                  aria-current="/about"
                  to="/about"
                >
                  About Us
                </Link>
              </li>

              {isLoggedIn &&
                (currentUser && currentUser === "admin" ? (
                  <li className="nav-item">
                    <Link
                      className={
                        location.pathname === "/dashboard" ||
                        location.pathname === "/ingredients" ||
                        location.pathname === "/categories"
                          ? "menu current"
                          : "menu "
                      }
                      aria-current="/dashboard"
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className={
                        location.pathname === "/orders"
                          ? "menu current"
                          : "menu "
                      }
                      aria-current="/orders"
                      to="/orders"
                    >
                      Orders
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          {location.pathname === "/menu" && (
            <div className="d-none d-lg-flex me-lg-5 gap-lg-2 align-items-lg-center">
              <SearchComponent />
            </div>
          )}
          {location.pathname === "/dashboard" && (
            <div className="d-none d-lg-flex me-lg-5 gap-lg-2 align-items-lg-center">
              <SearchComponent />
            </div>
          )}
          <div className="d-flex gap-2">
            {currentUser !== "admin" && (
              <div className="position-relative me-2">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info-subtle text-info-emphasis">
                  {ordersQuantity()}
                </span>
                <button className="btn btn-outline-success">
                  <BsCart4 onClick={() => setShowCart(true)} />
                </button>
              </div>
            )}
            {!isLoggedIn && (
              <>
                <Link className="btn btn-outline-success" to="/register">
                  Register
                </Link>
                <Link className="btn btn-outline-success" to="/login">
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && <Logout setIsLoggedIn={setIsLoggedIn} />}
          </div>
        </div>
        {showCart && <Cart setShowCart={setShowCart} />}
        {showMobile && (
          <NavBarMobile
            setShowMobile={setShowMobile}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
      </nav>
    </div>
  );
};

export default NavBar;
