import apiConfig from "@config/apiConfig";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useAppContextOrder } from "./context";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = (item) => {
  const { orders, addToCard, removeFromCard, removeItem } =
    useAppContextOrder();

  const handleAddClick = (id) => {
    addToCard(id);
  };
  const handleRemoveClick = (id) => {
    removeFromCard(id);
  };
  console.log(item);
  return (
    <div className="d-flex w-100 justify-content-between">
      <div className="d-flex gap-3 align-items-center ">
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
          <div className="d-flex justify-content-start gap-2">
            <AiOutlineMinusCircle
              onClick={() => handleRemoveClick(item.id)}
              className="but text-info"
            />

            <AiOutlinePlusCircle
              onClick={() => handleAddClick(item.id)}
              className="but text-info"
            />
          </div>
        </div>
      </div>
      <div className="">
        <RiDeleteBin6Line
          onClick={() => removeItem(item.id)}
          className="del ms-5 text-danger"
        />
      </div>
    </div>
  );
};

export default CartItem;
