import apiConfig from "@config/apiConfig";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useAppContextOrder } from "./context";

const CartItem = (item) => {
  const { orders, addToCard, removeFromCard } = useAppContextOrder();

  const handleAddClick = (id) => {
    addToCard(id);
  };
  const handleRemoveClick = (id) => {
    removeFromCard(id);
  };
  console.log(item);
  return (
    <>
      <img
        src={`${apiConfig.imgUrl}/${item.img}`}
        className="rounded"
        alt={item.name}
        width="100"
        height="100"
      />
      <div className="d-flex flex-column">
        <h3>{item.name} </h3>
        <h5>
          {
            <span className="">
              {orders.find((el) => el.dish_id === item.id)?.quantity}
            </span>
          }{" "}
          x {item.price}$
        </h5>
        <div className="d-flex justify-content-center gap-2">
          <AiOutlineMinusCircle
            onClick={() => handleRemoveClick(item.id)}
            className="del text-info"
          />

          <AiOutlinePlusCircle
            onClick={() => handleAddClick(item.id)}
            className="del text-info"
          />
        </div>
      </div>
    </>
  );
};

export default CartItem;
