import { combineReducers } from "redux";

import ui from "./ui";
import items from "./items";

export default combineReducers({
  ui,
  items,
});
