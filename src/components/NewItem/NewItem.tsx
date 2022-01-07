import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../store/items";

const NewItem = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async ({ title }) => {
      await dispatch(addItem(title));
    },
  });
  return (
    <div className="border bg-white border-primary rounded p-2">
      <form
        className="d-flex justify-content-between align-items-end"
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewItem;
