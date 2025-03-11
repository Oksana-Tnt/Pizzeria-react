import { Link, useLocation } from "react-router-dom";

const NavBarDashboard = () => {
  const location = useLocation();
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link
            to="/dashboard"
            className={
              location.pathname !== "/dashboard"
                ? "nav_item"
                : "nav_item_current"
            }
          >
            Dishes
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link
            to="/ingredients"
            className={
              location.pathname !== "/ingredients"
                ? "nav_item"
                : "nav_item_current"
            }
          >
            Ingredients
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link
            to="/categories"
            className={
              location.pathname !== "/categories"
                ? "nav_item"
                : "nav_item_current"
            }
          >
            Categories
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default NavBarDashboard;
