const FilterList = ({ title, data, handleCheckboxChange }) => {
  return (
    <div className="mb-4 d-flex flex-column">
      <label className="fs-4 mb-2">{title}</label>
      <div className="d-flex flex-wrap justify-content-center align-items-center flex-lg-column align-items-lg-start flex-lg-nowrap gap-2">
        {data?.map((category) => {
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
      </div>
    </div>
  );
};

export default FilterList;
