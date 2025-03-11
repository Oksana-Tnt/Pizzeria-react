import apiConfig from "../config/apiConfig";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useAppContextOrder } from "./context";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DishItemCard = ({ dish }) => {
  const { orders, addToCard, removeFromCard, isOrder } = useAppContextOrder();

  const handleAddClick = (id) => {
    addToCard(id);
    toast("The product has been successfully removed from your cart");
  };
  const handleRemoveClick = (id) => {
    removeFromCard(id);
    toast("The product has been successfully added to your cart");
  };
  return (
    <div className="card h-100 w-100 dish_card">
      <Link to={`/menu/${dish.dish_id}`} className="text-decoration-none">
        <img
          src={`${apiConfig.imgUrl}/${dish.dish_img}`}
          alt={dish.dish_name}
          width="200"
          height="200"
          className="mx-auto d-block"
        />
        <div className="d-flex gap-3 justify-content-center dish_ingredients_card">
          {dish.ingredients?.map((ingredient) => {
            return (
              <img
                src={`${apiConfig.imgUrl}/${ingredient.ingredient_img}`}
                width={20}
                height={20}
                key={ingredient.ingredient_id}
                className="ingredients_img"
              />
            );
          })}
        </div>
      </Link>
      <div className="card-body text-center">
        <h5 className="card-title">{dish.dish_name}</h5>
        <p className="card-text">{dish.dish_description}</p>
      </div>

      <p className="card-text text-center mb-5">{dish.dish_price} $ </p>
      {isOrder(dish.dish_id) > 0 ? (
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-outline-success"
            onClick={() => handleRemoveClick(dish.dish_id)}
          >
            <AiOutlineMinusCircle />
          </button>
          <span className="btn btn-outline-success">
            {orders.find((el) => el.dish_id === dish.dish_id)?.quantity}
          </span>
          <button
            className="btn btn-outline-success"
            onClick={() => handleAddClick(dish.dish_id)}
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          onClick={() => handleAddClick(dish.dish_id)}
        >
          Order
        </button>
      )}
    </div>
  );
};

export default DishItemCard;
