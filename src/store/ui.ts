import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIType = {
  modifyModalVisible: boolean;
};

const initialState = {
  modifyModalVisible: false,
} as UIType;

const { reducer, actions } = createSlice({
  name: "ui",
  initialState,
  reducers: {
    modifyModalVisibled: (ui, action: PayloadAction<undefined>) => {
      ui.modifyModalVisible = true;
    },
    modifyModalInvisibled: (ui, action: PayloadAction<undefined>) => {
      ui.modifyModalVisible = false;
    },
  },
});

export default reducer;
const { modifyModalInvisibled, modifyModalVisibled } = actions;

export const changeModifyModalVisibility =
  (visible: boolean) =>
  (
    dispatch: (arg0: { payload: undefined; type: string }) => any,
    getState: any
  ) => {
    if (visible) return dispatch(modifyModalVisibled());
    return dispatch(modifyModalInvisibled());
  };
