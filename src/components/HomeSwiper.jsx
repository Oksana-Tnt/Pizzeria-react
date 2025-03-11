import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { sliders } from "../utils/constants";

const HomeSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={false}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      className="mySwiper"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {sliders.map((slide) => (
        <SwiperSlide key={slide.idx}>
          <div className="background-container-home position-relative">
            <img src={slide.img} className="background-image" alt={slide.idx} />
            <motion.p
              key={activeIndex}
              className="position-absolute top-50 start-50 translate-middle z-3 description text-white text-center p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {slide.description}
            </motion.p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
