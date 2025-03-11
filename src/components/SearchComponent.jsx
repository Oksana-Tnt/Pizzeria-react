import { FiSearch } from "react-icons/fi";
import { useAppContextSearch } from "./context";
const SearchComponent = () => {
  const { setSearchQuery } = useAppContextSearch();
  return (
    <>
      <input
        className="form-control"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="border-0 bg-white">
        <FiSearch className="search_icon" />
      </button>
    </>
  );
};

export default SearchComponent;
