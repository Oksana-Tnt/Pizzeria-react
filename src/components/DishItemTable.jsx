import { FiEdit } from "react-icons/fi";
import apiConfig from "../config/apiConfig.js";
import ModalWrapper from "./ModalWrapper";
import DeleteForm from "./DeleteForm";
import { RiDeleteBin6Line } from "react-icons/ri";

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
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th className="text-center" colSpan="2">
            Action
          </th>
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
                  width="100"
                  height="100"
                />
              </td>
              <td>{dish.name}</td>
              <td>{dish.description}</td>
              <td>{dish.price}</td>

              <td className="text-center">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleUpdateButton(dish.id)}
                >
                  <FiEdit />
                </button>
              </td>
              <td className="text-center">
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
