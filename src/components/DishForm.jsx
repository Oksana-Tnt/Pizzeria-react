import { fetchFromDb, pushToDb } from "@utils/authHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DishForm = ({
  setModalShow,
  onCreateDish,
  findIdx,
  setUpdateDish,
  title,
}) => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(1);
  const [category_id, setCategory_id] = useState(1);
  const [img, setImg] = useState(null);

  useEffect(() => {
    try {
      fetchFromDb("ingredients").then((data) => {
        setIngredients(data);
      });
      fetchFromDb("categories").then((data) => {
        setCategories(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (findIdx) {
      try {
        fetchFromDb(`dishes/${findIdx}/ingredients`).then((data) => {
          setCheckedIngredients(data.ingredients.map((ing) => ing.id));
        });

        fetchFromDb(`dishes/${findIdx}`, true).then((data) => {
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price || "");
          setAvailable(data.available);
          setCategory_id(data.category_id);
          setImg(data.img);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [findIdx]);

  const handleCheckboxChange = (event) => {
    const ingredientId = Number(event.target.value);
    const isChecked = event.target.checked;

    setCheckedIngredients((prevCheckedIngredients) => {
      if (isChecked) {
        if (!prevCheckedIngredients.includes(ingredientId)) {
          return [...prevCheckedIngredients, ingredientId];
        }
      } else {
        return prevCheckedIngredients.filter((id) => id !== ingredientId);
      }
      return prevCheckedIngredients;
    });
  };

  const handleSubmin = async (event) => {
    event.preventDefault();
    if (!checkedIngredients || checkedIngredients.length === 0) {
      toast.error("Please select at least one ingredient.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("available", available);
    if (img) {
      formData.append("img", img);
    }
    formData.append("ingredients", checkedIngredients.join(","));
    formData.append("category_id", category_id);

    try {
      if (findIdx) {
        formData.append("_method", "PUT");
        await pushToDb(`dishes/${findIdx}`, formData, true);
        setUpdateDish((prev) => !prev);
        setModalShow(false);
        toast.success("Product has been updated successfully!");
      } else {
        await pushToDb("dishes", formData).then((data) => {
          onCreateDish(data);
          setModalShow(false);
          toast.success("Product has been created successfully!");
        });
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmin}
      className="d-flex flex-column gap-3 dish_form"
      encType="multipart/form-data"
    >
      <label>Ingredients</label>
      <div className="d-flex gap-3 flex-wrap">
        {ingredients?.map((ingredient) => {
          return (
            <div key={ingredient.id} className="d-flex gap-2 justify-center">
              <input
                className="form-check-input"
                type="checkbox"
                value={ingredient.id}
                id={`flexCheckDefault-${ingredient.id}`}
                onChange={handleCheckboxChange}
                checked={checkedIngredients?.some(
                  (ing) => ing === ingredient.id
                )}
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheckDefault-${ingredient.id}`}
              >
                {ingredient.name}
              </label>
            </div>
          );
        })}
      </div>

      <div>
        <label className="mb-2">Categories</label>
        <select
          name="category_id"
          className="form-select"
          onChange={(e) => setCategory_id(e.target.value)}
          value={category_id}
        >
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter name of dish"
        className="form-control"
        required
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Description</label>
      <textarea
        type="text"
        placeholder="Enter description of dish"
        className="form-control"
        required
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price</label>
      <input
        type="text"
        placeholder="Enter price of dish"
        className="form-control"
        required
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Image</label>

      <input
        type="file"
        placeholder="Choose img"
        className="form-control"
        name="img"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label>Availability</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="available"
          value="1"
          name="availability"
          checked={available === 1}
          onChange={(e) => setAvailable(Number(e.target.value))}
        />
        <label className="form-check-label" htmlFor="available">
          Available
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="nonavailable"
          value="0"
          name="availability"
          checked={available === 0}
          onChange={(e) => setAvailable(Number(e.target.value))}
        />
        <label className="form-check-label" htmlFor="nonavailable">
          Not available
        </label>
      </div>
      <button className="btn btn-outline-info">{title} </button>
    </form>
  );
};

export default DishForm;
