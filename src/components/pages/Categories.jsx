import { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import CategoryForm from "../CategoryForm";
import CategoriesItemTable from "../CategoriesItemTable";
import { fetchFromDb } from "@utils/authHelper";

const Categories = () => {
  const [modalShowCategory, setModalShowCategory] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [findIdx, setFindIdx] = useState(null);
  const [title, setTitle] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  useEffect(() => {
    try {
      fetchFromDb("categories").then((data) => {
        setCategories(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [isUpdated]);
  const handleCloseCategoriesModal = () => {
    setModalShowCategory(false);
  };
  const handleCreateCategoriesButton = () => {
    setModalShowCategory(true);
    setTitle("Create category");
  };
  const handleUpdateButton = (id) => {
    setFindIdx(id);
    setModalShowCategory(true);
    setTitle("Edit category");
  };
  const handleDeleteButton = (id) => {
    setDeleteIdx(id);
    setModalShowDelete(true);
    setTitle("Delete category");
  };
  const handleCloseDeleteModal = () => {
    setModalShowDelete(false);
  };
  const onDeleteItem = (category) => {
    setCategories(
      categories.filter((item) => {
        return item.id !== category.id;
      })
    );
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-outline-info btn-end"
          onClick={() => handleCreateCategoriesButton()}
        >
          Create new ingredient
        </button>
        <ModalWrapper
          show={modalShowCategory}
          onHide={() => handleCloseCategoriesModal()}
        >
          <CategoryForm
            setModalShowCategory={setModalShowCategory}
            onCreateCategory={(newCategory) =>
              setCategories([...categories, newCategory])
            }
            setUpdateCategory={setIsUpdated}
            findIdx={findIdx}
            title={title}
          />
        </ModalWrapper>
      </div>
      <CategoriesItemTable
        categories={categories}
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

export default Categories;
