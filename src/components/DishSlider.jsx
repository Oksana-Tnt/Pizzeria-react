import Slider from "react-slick";
import { Link } from "react-router-dom";
import apiConfig from "@config/apiConfig";

const DishSlider = ({ dishes }) => {
  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          fade: true,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {dishes?.map((item) => {
        return (
          <div
            className="d-flex flex-column align-items-center mb-5"
            key={item.id}
          >
            <Link
              to={`/menu/${item.id}`}
              className="text-decoration-none text-dark-emphasis dish_card rounded-3"
            >
              <div className="d-flex flex-column bg-secondary-subtle p-3 align-items-center ">
                <img
                  src={`${apiConfig.imgUrl}/${item.img}`}
                  width="200"
                  height="200"
                  className="mb-2"
                />
                <div className="d-flex gap-3 justify-content-center dish_ingredients">
                  {item.ingredients?.map((ingredient) => {
                    return (
                      <img
                        src={`${apiConfig.imgUrl}/${ingredient.img}`}
                        width={20}
                        height={20}
                        key={ingredient.id}
                        className="ingredients_img"
                      />
                    );
                  })}
                </div>
              </div>
              <div className="text-center bg-secondary-subtle">
                <h5> {item.name} </h5>
                <h6 className="mb-0 pb-2"> {item.price} $</h6>
              </div>
            </Link>
          </div>
        );
      })}
    </Slider>
  );
};

export default DishSlider;
