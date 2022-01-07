import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import { RootState } from "../../store/store";
import { changeModifyModalVisibility } from "../../store/ui";
import { removeItem, changeItemStatus, ItemStatuses } from "../../store/items";

const ModifyModal = () => {
  const dispatch = useDispatch();
  const modalVisible = useSelector(
    (state: RootState) => state.ui.modifyModalVisible
  );
  const selectedItem = useSelector(
    (state: RootState) => state.items.selectedItem
  )!;
  const handleDelete = () => {
    dispatch(removeItem(selectedItem.id));
    dispatch(changeModifyModalVisibility(false));
  };

  const handleChangeStatus = (status: ItemStatuses) => {
    dispatch(changeItemStatus(selectedItem.id, status));
    dispatch(changeModifyModalVisibility(false));
  };

  return (
    <Modal
      show={modalVisible}
      onHide={() => dispatch(changeModifyModalVisibility(false))}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modify Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <div className="btn-group">
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
          <button
            onClick={() => handleChangeStatus("todo")}
            type="button"
            className="btn btn-info"
            disabled={selectedItem.status === "todo"}
          >
            To Do
          </button>
          <button
            onClick={() => handleChangeStatus("inProgress")}
            type="button"
            className="btn btn-warning"
            disabled={selectedItem.status === "inProgress"}
          >
            In Progress
          </button>
          <button
            onClick={() => handleChangeStatus("finished")}
            type="button"
            className="btn btn-success"
            disabled={selectedItem.status === "finished"}
          >
            Finished
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModifyModal;
