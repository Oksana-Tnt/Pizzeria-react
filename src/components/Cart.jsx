import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri";
import { useAppContextOrder } from "./context";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
import CartImg from "/empty-cart.png";
import { fetchFromDb, getUser, pushToDb } from "@utils/authHelper";

const Cart = ({ setShowCart }) => {
  const { orders, setOrder, removeItem } = useAppContextOrder();
  const user = getUser();
  const [dishes, setDishes] = useState([]);
  const [cartDishes, setCartDishes] = useState([]);

  useEffect(() => {
    try {
      fetchFromDb("dishes", false).then((data) => setDishes(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const updatedCartDishes = orders
      .map((order) => {
        const dish = dishes.find((dish) => dish.id === order.dish_id);
        if (dish) {
          return {
            ...dish,
            quantity: order.quantity,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null values

    setCartDishes(updatedCartDishes);
  }, [orders, dishes]);

  const handleSendOrder = () => {
    try {
      pushToDb("orders", { user_id: user ? user.id : 1, items: orders }, true);
      toast("The order has been successfully added");
      localStorage.removeItem("orders");
      setOrder([]);
      setShowCart(false);
    } catch (err) {
      console.log(err);
    }
  };
  const totalAmount = cartDishes.reduce((acc, item) => {
    return (acc += item.quantity * item.price);
  }, 0);
  console.log(orders);
  return (
    <div className="backdrop">
      <div className="cart">
        <div className="position-relative mb-3">
          <RiCloseLargeLine
            onClick={() => setShowCart(false)}
            className="position-absolute top-0 end-0"
          />
        </div>
        <h1 className="mb-3">
          {user ? user.name.toUpperCase() : "Guest"} Card{" "}
        </h1>
        <ul className="list-group list-group-numbered mb-5">
          {cartDishes.length > 0 ? (
            cartDishes.map((item) => (
              <li
                className="list-group-item d-flex gap-3 align-items-center"
                key={item.id}
              >
                <CartItem {...item} />
                <RiDeleteBin6Line
                  onClick={() => removeItem(item.id)}
                  className="del ms-5 text-danger"
                />
              </li>
            ))
          ) : (
            <div className="p-5 text-center">
              <img
                src={CartImg}
                alt="Cart"
                width={300}
                height={300}
                className="mb-3"
              />
              <h3>Your cart is empty.</h3>
            </div>
          )}
        </ul>
        <h3 className="mb-5 text-center">Total order: {totalAmount} $</h3>
        {orders.length > 0 && (
          <div className="d-grid">
            <button className="btn btn-outline-info" onClick={handleSendOrder}>
              Send order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
