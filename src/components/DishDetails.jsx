import { useEffect, useState } from "react";
import IngredientCarousel from "./IngredientCarousel";
import { fetchFromDb } from "../utils/authHelper";
import apiConfig from "../config/apiConfig";

const DishDetails = ({ dish }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetchFromDb(`dishes/${dish.id}/ingredients`, true).then((data) => {
      setIngredients(data.ingredients);
    });
  }, [dish.id]);
  const OPTIONS = { loop: true };

  return (
    <div className="row mb-5">
      <div className="justify-content-center col-lg-6">
        <img
          src={`${apiConfig.imgUrl}/${dish.img}`}
          className="object-fit-cover dish_img"
        />
      </div>
      <div className="p-4 col-lg-6 text-center d-flex flex-column justify-content-between">
        <h2 className="fs-1 mb-3">{dish.name} </h2>
        <h3 className="fs-3 mb-4">{dish.description} </h3>
        {ingredients && (
          <IngredientCarousel slides={ingredients} options={OPTIONS} />
        )}
      </div>
    </div>
  );
};

export default DishDetails;
