import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";

import { RootState } from "../../store/store";
import { changeModifyModalVisibility } from "../../store/ui";
import {
  removeItem,
  changeItemStatus,
  ItemStatuses,
  changeItemTitle,
} from "../../store/items";

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

  const formik = useFormik({
    initialValues: {
      title: selectedItem ? selectedItem.title : "",
    },
    onSubmit: async ({ title }) => {
      await dispatch(changeItemTitle(title, selectedItem.id));
      dispatch(changeModifyModalVisibility(false));
    },
    enableReinitialize: true,
  });

  return (
    <Modal
      show={modalVisible}
      onHide={() => dispatch(changeModifyModalVisibility(false))}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modify Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center">
        <form
          className="d-flex justify-content-between align-items-end mb-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-group w-50">
            <label htmlFor="title">Item Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              {...formik.getFieldProps("title")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting && (
              <span className="spinner-grow spinner-grow-sm mr-2" />
            )}
            Change
          </button>
        </form>
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
            disabled={selectedItem && selectedItem.status === "todo"}
          >
            To Do
          </button>
          <button
            onClick={() => handleChangeStatus("inProgress")}
            type="button"
            className="btn btn-warning"
            disabled={selectedItem && selectedItem.status === "inProgress"}
          >
            In Progress
          </button>
          <button
            onClick={() => handleChangeStatus("finished")}
            type="button"
            className="btn btn-success"
            disabled={selectedItem && selectedItem.status === "finished"}
          >
            Finished
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModifyModal;
