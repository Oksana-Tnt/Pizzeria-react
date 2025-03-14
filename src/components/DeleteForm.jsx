import { useEffect, useState } from "react";
import apiConfig from "../config/apiConfig";
import { deleteFromDb, fetchFromDb } from "../utils/authHelper.js";
import { toast } from "react-toastify";

const DeleteForm = ({ itemId, onDeleteItem, setModalShowDelete, action }) => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    try {
      if (action === "dish") {
        fetchFromDb(`dishes/${itemId}`, true).then((data) => {
          setItem(data);
        });
      } else if (action === "ingredients") {
        fetchFromDb(`ingredients/${itemId}`, true).then((data) => {
          setItem(data);
        });
      } else {
        fetchFromDb(`category/${itemId}`, true).then((data) => {
          setItem(data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [action, itemId]);
  const handleDelete = () => {
    try {
      if (action === "dish") {
        deleteFromDb("dishes", itemId).then((data) => {
          onDeleteItem(data);
        });
      } else if (action === "ingredients") {
        deleteFromDb("ingredients", itemId).then((data) => {
          onDeleteItem(data);
        });
      } else {
        deleteFromDb("category", itemId).then((data) => {
          onDeleteItem(data);
        });
      }
      setModalShowDelete(false);
      toast("Product has been deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="text-danger text-center">
        This item will be deleted, are you sure?
      </h2>
      <div className="d-flex gap-5 align-items-center justify-content-center">
        <img
          src={`${apiConfig.imgUrl}/${item.img}`}
          alt={item.name}
          className="rounded"
          width="100"
          height="100"
        />
        <h3>{item.name} </h3>
      </div>
      <div className="d-flex gap-3 justify-content-center">
        <button
          onClick={() => handleDelete()}
          className="btn btn-outline-danger"
        >
          Delete
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => setModalShowDelete(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteForm;
