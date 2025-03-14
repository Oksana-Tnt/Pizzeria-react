import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { aboutSliders } from "@utils/constants";

const AboutSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      spaceBetween={30}
      navigation={false}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      className="mySwiper"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {aboutSliders.map((slide) => (
        <SwiperSlide key={slide.idx}>
          <div className="background-container position-relative">
            <motion.div
              key={activeIndex}
              className="position-absolute top-50 start-50 translate-middle z-3 description text-white text-center p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3> {slide.title}</h3>
              <p>{slide.description}</p>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AboutSwiper;
