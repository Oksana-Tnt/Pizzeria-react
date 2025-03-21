import apiConfig from "@config/apiConfig";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";

const IngredientCarousel = (props) => {
  const { slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla mb-5">
      <h4 className="mb-3 text-center"> Ingredients: </h4>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((ingredient) => (
            <div
              className="embla__slide d-flex flex-column align-items-center"
              key={ingredient.id}
            >
              <img
                className="embla__slide__number bg-secondary-subtle mb-1"
                src={`${apiConfig.imgUrl}/${ingredient.img}`}
              />
              <h6 className="ingredient_name">{ingredient.name} </h6>
            </div>
          ))}
        </div>
        {slides.length > 5 && (
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientCarousel;
