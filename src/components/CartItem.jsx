import apiConfig from "../config/apiConfig";

const CartItem = (item) => {
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
          {item.quantity} x {item.price}$
        </h5>
      </div>
    </>
  );
};

export default CartItem;
