import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import { AiTwotoneHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Panel = ({ children }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="d-flex gap-2 align-items-center text-success fs-5 p-0">
      <button
        className="button_panel text-success nav_icon"
        onClick={handleBack}
      >
        Back
        <IoArrowBackSharp className="ms-2 text-success" />
      </button>

      <Link to="/">
        <AiTwotoneHome className="home_icon" />
      </Link>
      <button className="button_panel">
        <IoArrowForwardSharp className="text-success nav_icon" />
      </button>
      <div className="">{children}</div>
    </div>
  );
};

export default Panel;
