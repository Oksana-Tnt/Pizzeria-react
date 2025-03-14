import apiConfig from "config/apiConfig";

const IngredientsSlider = ({ ingredients }) => {
  return (
    <div className="d-flex gap-2 flex-wrap justify-content-center justify-content-lg-start">
      {ingredients?.map((ingredient) => {
        return (
          <div
            key={ingredient.id}
            className="d-flex flex-column align-items-center bg-secondary-subtle gap-3 rounded-3 p-3 justify-content-center ingredient_card "
          >
            <img
              src={`${apiConfig.imgUrl}/${ingredient.img}`}
              width="50"
              height="50"
            />
            <h6>{ingredient.name} </h6>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsSlider;
