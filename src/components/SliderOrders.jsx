import apiConfig from "@config/apiConfig";
import Slider from "react-slick";

const SliderOrders = ({ items }) => {
  var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const totalAmount = items.reduce((acc, item) => {
    return (acc += item.quantity * item.dish.price);
  }, 0);
  return (
    <>
      <h3 className="mb-3"> {totalAmount}$</h3>
      <Slider {...settings}>
        {items?.map((item) => {
          return (
            <div
              key={item.order_id}
              className="d-flex flex-column align-items-center"
            >
              <div className="bg-secondary-subtle p-3 text-center dish_card">
                <img
                  src={`${apiConfig.imgUrl}/${item.dish.img}`}
                  width="200"
                  height="200"
                />
                <h5>{item.dish.name} </h5>
                <h6>
                  {item.quantity} x {item.dish.price}$
                </h6>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default SliderOrders;
