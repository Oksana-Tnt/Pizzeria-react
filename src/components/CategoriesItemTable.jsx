import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalWrapper from "./ModalWrapper";
import DeleteForm from "./DeleteForm";
import apiConfig from "../config/apiConfig";

const CategoriesItemTable = ({
  categories,
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
        {categories.map((category) => {
          return (
            <tr key={category.id} className="align-middle">
              <td>{category.id}</td>
              <td>
                <img
                  src={`${apiConfig.imgUrl}/${category.img}`}
                  className="rounded"
                  alt={category.name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{category.name}</td>

              <td className="text-center">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleUpdateButton(category.id)}
                >
                  <FiEdit />
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteButton(category.id)}
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
                  action="category"
                />
              </ModalWrapper>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesItemTable;
