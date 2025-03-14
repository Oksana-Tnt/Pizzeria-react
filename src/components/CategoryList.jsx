import apiConfig from "@config/apiConfig";

const CategoryList = ({ data, handleCheckboxChange }) => {
  return (
    <div className="d-flex gap-2 mb-3 justify-content-center">
      {data?.map((category) => {
        return (
          <div key={category.id} className="d-flex gap-5 justify-center">
            <label className="custom-checkbox ">
              <input
                className="form-check-input"
                type="checkbox"
                value={category.id}
                id={`flexCheckDefault-${category.id}`}
                onChange={handleCheckboxChange}
              />
              <div className="svg d-flex flex-column align-items-center ">
                <img
                  src={`${apiConfig.imgUrl}/${category.img}`}
                  alt={category.name}
                  className="category_img"
                />
                <h6>{category.name}</h6>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
