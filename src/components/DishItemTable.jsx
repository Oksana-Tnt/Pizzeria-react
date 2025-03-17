import { FiEdit } from "react-icons/fi";
import ModalWrapper from "./ModalWrapper";
import DeleteForm from "./DeleteForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import apiConfig from "@config/apiConfig";

const DishItemTable = ({
  dishes,
  handleUpdateButton,
  handleDeleteButton,
  handleCloseDeleteModal,
  title,
  onDeleteItem,
  deleteIdx,
  modalShowDelete,
  setModalShowDelete,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Img</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish) => {
          return (
            <tr key={dish.id} className="align-middle">
              <td>{dish.id}</td>
              <td>
                <img
                  src={`${apiConfig.imgUrl}/${dish.img}`}
                  className="rounded"
                  alt={dish.name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{dish.name}</td>
              <td>{dish.price}</td>

              <td className="d-flex flex-column justify-content-center align-items-center gap-2 flex-md-row action_row">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleUpdateButton(dish.id)}
                >
                  <FiEdit />
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteButton(dish.id)}
                >
                  <RiDeleteBin6Line />
                </button>
              </td>

              <ModalWrapper
                show={modalShowDelete}
                onHide={() => handleCloseDeleteModal()}
                title={title}
              >
                <DeleteForm
                  itemId={deleteIdx}
                  onDeleteItem={(item) => onDeleteItem(item)}
                  setModalShowDelete={setModalShowDelete}
                  action="dish"
                />
              </ModalWrapper>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DishItemTable;
