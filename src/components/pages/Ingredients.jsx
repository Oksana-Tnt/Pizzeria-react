import { useEffect, useState } from "react";
import IngredientForm from "../IngredientForm";
import ModalWrapper from "../ModalWrapper";
import { fetchFromDb } from "../../utils/authHelper.js";
import IngredientsItemTable from "../IngredientsItemTable";

const Ingredients = () => {
  const [modalShowIngredient, setModalShowIngredient] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [findIdx, setFindIdx] = useState(null);
  const [title, setTitle] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  useEffect(() => {
    try {
      fetchFromDb("ingredients").then((data) => {
        setIngredients(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [isUpdated]);
  const handleCloseIngredientsModal = () => {
    setModalShowIngredient(false);
  };
  const handleCreateIngredientsButton = () => {
    setModalShowIngredient(true);
    setTitle("Create ingredient");
  };
  const handleUpdateButton = (id) => {
    setFindIdx(id);
    setModalShowIngredient(true);
    setTitle("Edit ingredient");
  };
  const handleDeleteButton = (id) => {
    setDeleteIdx(id);
    setModalShowDelete(true);
    setTitle("Delete ingredient");
  };
  const handleCloseDeleteModal = () => {
    setModalShowDelete(false);
  };
  const onDeleteItem = (ingredient) => {
    setIngredients(
      ingredients.filter((item) => {
        return item.id !== ingredient.id;
      })
    );
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-outline-info btn-end"
          onClick={() => handleCreateIngredientsButton()}
        >
          Create new ingredient
        </button>
        <ModalWrapper
          show={modalShowIngredient}
          onHide={() => handleCloseIngredientsModal()}
        >
          <IngredientForm
            setModalShowIngredient={setModalShowIngredient}
            onCreateIngredient={(newIngredient) =>
              setIngredients([...ingredients, newIngredient])
            }
            setUpdateIngredient={setIsUpdated}
            findIdx={findIdx}
            title={title}
          />
        </ModalWrapper>
      </div>
      <IngredientsItemTable
        ingredients={ingredients}
        handleUpdateButton={handleUpdateButton}
        handleDeleteButton={handleDeleteButton}
        handleCloseDeleteModal={handleCloseDeleteModal}
        title={title}
        onDeleteItem={onDeleteItem}
        deleteIdx={deleteIdx}
        modalShowDelete={modalShowDelete}
        setModalShowDelete={setModalShowDelete}
      />
    </>
  );
};

export default Ingredients;
