import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Item from "../../components/Item/Item";
import ModifyModal from "../../components/ModifyModal/ModifyModal";
import NewItem from "../../components/NewItem/NewItem";
import { RootState } from "../../store/store";
import { clearItems, loadItems } from "../../store/items";

const Home = () => {
  const dispatch = useDispatch();
  const todoItems = useSelector((state: RootState) => state.items.list).filter(
    (i) => i.status === "todo"
  );
  const inProgressItems = useSelector(
    (state: RootState) => state.items.list
  ).filter((i) => i.status === "inProgress");
  const finishedItems = useSelector(
    (state: RootState) => state.items.list
  ).filter((i) => i.status === "finished");

  useEffect(() => {
    let itemsFromLocalStorage = localStorage.getItem("items");
    if (!itemsFromLocalStorage) return;
    itemsFromLocalStorage = JSON.parse(itemsFromLocalStorage);
    dispatch(loadItems(itemsFromLocalStorage));
  }, [dispatch]);

  return (
    <React.Fragment>
      <ModifyModal />
      <main className="container">
        <div className="row">
          <section className="col-lg-4 col-12 mt-2 mt-lg-0">
            <p className="text-center bg-info rounded">To Do Items</p>
            <ul className="list-group">
              {todoItems.map((i) => (
                <Item item={i} key={i.id.toString()} />
              ))}
              {todoItems.length === 0 && (
                <p className="text-center text-muted">
                  To do Items is empty :)
                </p>
              )}
            </ul>
          </section>
          <section className="col-lg-4 col-12 mt-2 mt-lg-0">
            <p className="text-center bg-primary rounded">In Progress Items</p>
            <ul className="list-group">
              {inProgressItems.map((i) => (
                <Item item={i} key={i.id.toString()} />
              ))}
              {inProgressItems.length === 0 && (
                <p className="text-center text-muted">
                  In Progress Items is empty :)
                </p>
              )}
            </ul>
          </section>
          <section className="col-lg-4 col-12 mt-2 mt-lg-0">
            <p className="text-center bg-success rounded">Finished Items</p>
            <ul className="list-group">
              {finishedItems.map((i) => (
                <Item item={i} key={i.id.toString()} />
              ))}
              {finishedItems.length === 0 && (
                <p className="text-center text-muted">
                  Finished Items is empty :)
                </p>
              )}
            </ul>
          </section>
        </div>
        <div className="row align-items-end justify-content-between mt-3 border py-2 rounded">
          <div className="col-lg-4 col-12">
            <NewItem />
          </div>
          <div className="col-lg-2 col-12 mt-2 mt-lg-0">
            <button
              onClick={() => dispatch(clearItems())}
              className="btn btn-danger w-100"
            >
              Reset Items
            </button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
