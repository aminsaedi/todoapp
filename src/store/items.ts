import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type ItemStatuses = "todo" | "inProgress" | "finished";

export type ItemType = {
  id: number;
  title: string;
  status: ItemStatuses;
};

type ItemsType = {
  list: ItemType[];
  loading: boolean;
  selectedItem: ItemType | undefined;
};

const initialState = {
  list: [],
  loading: false,
  selectedItem: undefined,
} as ItemsType;

const { reducer, actions } = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemAdded: (items, action: PayloadAction<string>) => {
      const lastItem = items.list[items.list.length - 1];
      items.loading = true;
      items.list.push({
        id: lastItem ? lastItem.id + 1 : 1,
        title: action.payload,
        status: "todo",
      });
    },
    itemStatusChanged: (
      items,
      action: PayloadAction<{ id: number; status: ItemStatuses }>
    ) => {
      items.list = items.list.map((i) => {
        if (i.id === action.payload.id) {
          i.status = action.payload.status;
          return i;
        } else return i;
      });
    },
    itemRemoved: (items, action: PayloadAction<number>) => {
      items.list = items.list.filter((i) => i.id !== action.payload);
    },
    itemsCleared: (items, action: PayloadAction<undefined>) => {
      items.list = [];
    },
    selectedItemChanged: (items, action: PayloadAction<ItemType>) => {
      items.selectedItem = action.payload;
    },
  },
});

export default reducer;
const {
  itemAdded,
  itemRemoved,
  itemStatusChanged,
  itemsCleared,
  selectedItemChanged,
} = actions;

export const addItem =
  (title: string) =>
  async (
    dispatch: (arg0: { payload: any; type: string }) => any,
    getState: any
  ) => {
    await delay(2000);
    return dispatch(itemAdded(title));
  };
export const removeItem =
  (id: number) =>
  (dispatch: (arg0: { payload: any; type: string }) => any, getState: any) => {
    return dispatch(itemRemoved(id));
  };
export const changeItemStatus =
  (id: number, status: ItemStatuses) =>
  (dispatch: (arg0: { payload: any; type: string }) => any, getState: any) => {
    return dispatch(itemStatusChanged({ id, status }));
  };

export const clearItems =
  () =>
  (dispatch: (arg0: { payload: any; type: string }) => any, getState: any) => {
    return dispatch(itemsCleared());
  };

export const changeSelectedItem =
  (item: ItemType) =>
  (
    dispatch: (arg0: { payload: ItemType; type: string }) => any,
    getState: any
  ) => {
    return dispatch(selectedItemChanged(item));
  };
