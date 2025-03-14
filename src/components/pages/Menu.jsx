import { useEffect, useState } from "react";
import { fetchFromDb } from "../../utils/authHelper.js";
import FilterList from "../FilterList";
import DishItemCard from "../DishItemCard";
import CategoryList from "../CategoryList";
import SearchComponent from "../SearchComponent";
import { useAppContextSearch } from "../context";

const Menu = () => {
  const [categoriesWithDishes, setCategoriesWithDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const { search } = useAppContextSearch();
  console.log(search);
  useEffect(() => {
    try {
      fetchFromDb("categories", false).then((data) => {
        setCategories(data);
      });
      fetchFromDb("ingredients", false).then((data) => {
        setIngredients(data);
      });

      if (selectedCategories.length > 0 && selectedIngredients.length > 0) {
        fetchFromDb(
          `dishes-with-params?search=${search}&ingredients=${selectedIngredients}&category=${selectedCategories}`,
          false
        ).then((data) => {
          setCategoriesWithDishes(data);
        });
      } else if (selectedIngredients.length > 0) {
        fetchFromDb(
          `dishes-with-params?search=${search}&ingredients=${selectedIngredients}`,
          false
        ).then((data) => {
          setCategoriesWithDishes(data);
        });
      } else if (selectedCategories.length > 0) {
        fetchFromDb(
          `dishes-with-params?search=${search}&category=${selectedCategories}`,
          false
        ).then((data) => {
          setCategoriesWithDishes(data);
        });
      } else {
        fetchFromDb(`dishes-with-params?search=${search}`, false).then(
          (data) => {
            setCategoriesWithDishes(
              data.filter((item) => {
                return item.dishes.length > 0;
              })
            );
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [search, selectedCategories, selectedIngredients]);
  const handleCheckboxChangeCategories = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }
  };
  const handleCheckboxChangeIngredients = (e) => {
    const ingredient = e.target.value;
    if (e.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((cat) => cat !== ingredient)
      );
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="d-flex me-5 gap-2 mb-4 w-100 align-items-center d-lg-none">
          <SearchComponent />
        </div>
        <CategoryList
          data={categories}
          handleCheckboxChange={handleCheckboxChangeCategories}
        />
        <div className="row row-cols row-cols-lg-2 g-lg-3">
          <div className="col-12 col-lg-2">
            <h2 className="mb-2 text-success">Filters</h2>
            <FilterList
              title="Ingredients"
              data={ingredients}
              handleCheckboxChange={handleCheckboxChangeIngredients}
            />
          </div>
          <div className="col-12 col-lg-10">
            {categoriesWithDishes?.map((category) => {
              return (
                <div
                  key={category.category_id}
                  className=" d-flex flex-column gap-4"
                >
                  <h2 className="text-center text-md-start text-success">
                    {category.category_name}
                  </h2>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
                    {category.dishes.map((dish) => {
                      return (
                        <div key={dish.dish_id}>
                          <DishItemCard dish={dish} key={dish.dish_id} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
