import { useEffect, useState } from "react";
import { fetchFromDb, getUser } from "../../utils/authHelper.js";
import SliderOrders from "../SliderOrders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = getUser();
  useEffect(() => {
    try {
      fetchFromDb(`users/${user.id}/orders`).then((data) => {
        setOrders(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);
  return (
    <div className="section">
      <div className="container px-5 px-lg-2">
        <h1 className="mb-5"> {user.name.toUpperCase()} orders</h1>
        {orders[0]?.map((order) => {
          return (
            <div key={order.id} className="mb-5 slider-container">
              <h2>{order.data} </h2>
              <SliderOrders items={order.items} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
