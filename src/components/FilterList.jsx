import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const FilterList = ({ title, data, handleCheckboxChange }) => {
  const [showMore, setShowMore] = useState(false);

  const truncateData = (s, w) => {
    if (!s) return;

    return s.length > w ? s.slice(0, w) : s;
  };

  const resultData = truncateData(data, 10);
  const dataForRender = showMore ? data : resultData;

  return (
    <div className="mb-4 d-flex flex-column">
      <label className="fs-4 mb-2">{title}</label>
      <div className="d-flex flex-wrap justify-content-center align-items-center flex-lg-column align-items-lg-start flex-lg-nowrap gap-2">
        {dataForRender?.map((category) => {
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

        <button
          onClick={() => setShowMore(!showMore)}
          className="btn text-success p-0"
        >
          {showMore ? <FiMinus /> : <FiPlus />}
        </button>
      </div>
    </div>
  );
};

export default FilterList;
