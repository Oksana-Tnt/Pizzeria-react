import { useEffect, useState } from "react";
import { fetchFromDb } from "@utils/authHelper";
import apiConfig from "@config/apiConfig";
import Panel from "./Panel";
import IngredientCarousel from "./IngredientCarousel";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useAppContextOrder } from "./context";
import { toast } from "react-toastify";

const DishDetails = ({ dish }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetchFromDb(`dishes/${dish.id}/ingredients`, true).then((data) => {
      setIngredients(data.ingredients);
    });
  }, [dish.id]);

  const { orders, addToCard, removeFromCard, isOrder } = useAppContextOrder();

  const handleAddClick = (id) => {
    addToCard(id);
    toast("The product has been successfully added to your cart");
  };
  const handleRemoveClick = (id) => {
    removeFromCard(id);
    toast("The product has been successfully removed from your cart");
  };

  return (
    <div className="row mb-5 px-0">
      <div className="text-center col-lg-6">
        <Panel>{dish.name} </Panel>
        <img
          src={`${apiConfig.imgUrl}/${dish.img}`}
          className="object-fit-cover dish_img"
        />
      </div>
      <div className="p-4 col-lg-6 text-center d-flex flex-column justify-content-evenly">
        <h2 className="fs-1 mb-3">{dish.name} </h2>
        <h3 className="fs-3 mb-4">{dish.description} </h3>
        <div>
          {ingredients && <IngredientCarousel slides={ingredients} />}
          {isOrder(dish.id) > 0 ? (
            <div className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-outline-success"
                onClick={() => handleRemoveClick(dish.id)}
              >
                <AiOutlineMinusCircle />
              </button>
              <span className="btn btn-outline-success">
                {orders.find((el) => el.dish_id === dish.id)?.quantity}
              </span>
              <button
                className="btn btn-outline-success"
                onClick={() => handleAddClick(dish.id)}
              >
                <AiOutlinePlusCircle />
              </button>
            </div>
          ) : (
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                className="btn btn-outline-success order_button"
                onClick={() => handleAddClick(dish.id)}
              >
                Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
