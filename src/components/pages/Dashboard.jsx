import { useEffect, useState } from "react";
import { fetchFromDb } from "../../utils/authHelper";
import ModalWrapper from "../ModalWrapper";
import DishForm from "../DishForm";
import DishItemTable from "../DishItemTable";
import IngredientForm from "../IngredientForm";
import NavBarDashboard from "../NavBarDashboard";

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [findIdx, setFindIdx] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [title, setTitle] = useState("");
  const [deleteIdx, setDeleteIdx] = useState(null);

  useEffect(() => {
    try {
      fetchFromDb("dishes").then((data) => {
        setDishes(
          data.sort((cat1, cat2) => cat1.category_id - cat2.category_id)
        );
      });
    } catch (err) {
      console.log(err);
    }
  }, [isUpdated]);
  const handleCloseModal = () => {
    setModalShow(false);
    setFindIdx(null);
  };
  const handleCloseDeleteModal = () => {
    setModalShowDelete(false);
  };

  const handleDeleteButton = (id) => {
    setDeleteIdx(id);
    setModalShowDelete(true);
    setTitle("Delete dish");
  };

  const handleUpdateButton = (id) => {
    setFindIdx(id);
    setModalShow(true);
    setTitle("Edit dish");
  };
  const handleCreateButton = () => {
    setModalShow(true);
    setTitle("Create new dish");
  };

  const onDeleteItem = (dish) => {
    setDishes(
      dishes.filter((item) => {
        return item.id !== dish.id;
      })
    );
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-outline-info btn-md-end"
          onClick={() => handleCreateButton()}
        >
          Create new dish
        </button>

        <ModalWrapper
          show={modalShow}
          onHide={() => handleCloseModal()}
          title={title}
        >
          <DishForm
            setModalShow={setModalShow}
            onCreateDish={(newDish) => setDishes([...dishes, newDish])}
            setUpdateDish={setIsUpdated}
            findIdx={findIdx}
            title={title}
          />
        </ModalWrapper>
      </div>
      <DishItemTable
        dishes={dishes}
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

export default Dashboard;
