import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteForm from "./DeleteForm";
import ModalWrapper from "./ModalWrapper";
import apiConfig from "@config/apiConfig";

const IngredientsItemTable = ({
  ingredients,
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
          <th className="text-center" colSpan="2">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient) => {
          return (
            <tr key={ingredient.id} className="align-middle">
              <td>{ingredient.id}</td>
              <td>
                <img
                  src={`${apiConfig.imgUrl}/${ingredient.img}`}
                  className="rounded"
                  alt={ingredient.name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{ingredient.name}</td>

              <td className="text-center">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleUpdateButton(ingredient.id)}
                >
                  <FiEdit />
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteButton(ingredient.id)}
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
                  action="ingredient"
                />
              </ModalWrapper>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default IngredientsItemTable;
