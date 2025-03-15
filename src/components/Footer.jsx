import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-0 px-2 border-top">
      <p className="d-none d-md-block col-md-4 mb-0 text-body-md-secondary">
        © Created by Oksana Tantsiura
      </p>

      <Link className="nav-link active" aria-current="/" to="/">
        <img src="/logo.png" alt="logo" width={70} height={70} />
      </Link>

      <ul className="nav col-md-4 justify-content-end gap-2">
        <li className="nav-item ">
          <Link to="/" className=" menu_footer fw-bold fs-6">
            Home
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/menu" className="menu_footer fw-bold fs-6">
            Menu
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/about" className=" menu_footer fw-bold fs-6">
            About Us
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
