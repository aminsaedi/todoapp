import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";

import { ItemType, changeSelectedItem } from "../../store/items";
import { changeModifyModalVisibility } from "../../store/ui";

const Item = ({ item }: { item: ItemType }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(changeSelectedItem(item));
    dispatch(changeModifyModalVisibility(true));
  };

  return (
    <React.Fragment>
      <li className="list-group-item border border-primary rounded mt-2">
        <article className="d-flex flex-column align-items-center">
          <p>{item.title}</p>
          <Button variant="primary" onClick={handleOpenModal}>
            Open Modal
          </Button>
        </article>
      </li>
    </React.Fragment>
  );
};

export default Item;
