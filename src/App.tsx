import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";

import Home from "./screens/Home/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
