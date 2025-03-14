import { fetchFromDb, pushToDb } from "@utils/authHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const IngredientForm = ({
  setModalShowIngredient,
  onCreateIngredient,
  setUpdateIngredient,
  findIdx,
  title,
}) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (findIdx) {
      try {
        fetchFromDb(`ingredients/${findIdx}`, true).then((data) => {
          setName(data.name || "");
          setImg(data.img);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [findIdx]);

  const handleSubmin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (img) {
      formData.append("img", img);
    }

    try {
      if (findIdx) {
        formData.append("_method", "PUT");
        await pushToDb(`ingredients/${findIdx}`, formData);
        setUpdateIngredient((prev) => !prev);
        setModalShowIngredient(false);
        toast.success("Ingredient has been updated successfully!");
      } else {
        await pushToDb("ingredients", formData).then((data) => {
          onCreateIngredient(data);
          setModalShowIngredient(false);
          toast.success("Ingredient has been created successfully!");
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
      className="d-flex flex-column gap-3"
      encType="multipart/form-data"
    >
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

      <label>Image</label>
      <input
        type="file"
        placeholder="Choose img"
        className="form-control"
        name="img"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <button className="btn btn-outline-info">{title} </button>
    </form>
  );
};

export default IngredientForm;
