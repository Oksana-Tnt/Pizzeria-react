import { useParams } from "react-router";
import DishDetails from "../DishDetails";
import { useEffect, useState } from "react";
import { fetchFromDb } from "../../utils/authHelper";
import DishSlider from "../DishSlider";
import Panel from "../Panel";

const Details = () => {
  const { id } = useParams();
  const [dish, setDish] = useState({});
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    try {
      fetchFromDb(`dishes/${id}`, true).then((data) => {
        setDish(data);
      });
      fetchFromDb("dishes/ingredients", true).then((data) => {
        setDishes(
          data.sort((cat1, cat2) => cat1.category_id - cat2.category_id)
        );
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return (
    <div className="section">
      <div className="container">
        <Panel>{dish.name} </Panel>

        <DishDetails dish={dish} />
        <DishSlider dishes={dishes} />
      </div>
    </div>
  );
};

export default Details;
