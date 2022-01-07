import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

// eslint-disable-next-line import/no-anonymous-default-export
const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
