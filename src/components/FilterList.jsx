import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const FilterList = ({ title, data, handleCheckboxChange }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data.slice(0, 9));
  }, [data]);
  const handleButtonPlus = () => {
    setList(data);
  };
  const handleButtonMinus = () => {
    setList(data.slice(0, 9));
  };
  return (
    <div className="mb-4 d-flex flex-column">
      <label className="fs-4 mb-2">{title}</label>
      <div className="d-flex flex-wrap justify-content-center align-items-center flex-lg-column align-items-lg-start flex-lg-nowrap gap-2">
        {list?.map((category) => {
          return (
            <div key={category.id} className="d-flex gap-3 justify-center">
              <label className="custom-checkbox">
                <input
                  className="form-check-input "
                  type="checkbox"
                  value={category.id}
                  id={`flexCheckDefault-${category.id}`}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>
                {category.name}
              </label>
            </div>
          );
        })}
        {list.length < 10 && (
          <FaPlus onClick={handleButtonPlus} className="text-success" />
        )}

        {list.length > 9 && (
          <FaMinus onClick={handleButtonMinus} className="text-success" />
        )}
      </div>
    </div>
  );
};

export default FilterList;
