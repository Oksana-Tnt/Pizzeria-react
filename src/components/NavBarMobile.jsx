import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavBarMobile = ({ setShowMobile, isLoggedIn, currentUser }) => {
  return (
    <div className="backdrop">
      <div className="mobile bg-body-tertiary">
        <div className="position-relative mb-3">
          <RiCloseLargeLine
            onClick={() => setShowMobile(false)}
            className="position-absolute top-0 end-0"
          />
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-md-0 fs-3">
          <li className="nav-item">
            <Link
              className={location.pathname === "/" ? "menu current" : "menu "}
              aria-current="/"
              to="/"
              onClick={() => setShowMobile(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                location.pathname === "/menu" ? "menu current" : "menu "
              }
              aria-current="/menu"
              to="/menu"
              onClick={() => setShowMobile(false)}
            >
              Menu
            </Link>
          </li>
          <>
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/about" ? "menu current" : "menu "
                }
                aria-current="/about"
                to="/about"
                onClick={() => setShowMobile(false)}
              >
                About Us
              </Link>
            </li>
          </>

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
                  onClick={() => setShowMobile(false)}
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/orders" ? "menu current" : "menu "
                  }
                  aria-current="/orders"
                  to="/orders"
                  onClick={() => setShowMobile(false)}
                >
                  Orders
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBarMobile;
