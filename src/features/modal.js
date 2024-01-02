import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "modal",
  initialState: {
    message: "",
    visible: false,
    error: true,
  },
  reducers: {
    displayMessage: (state, action) => {
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.visible = true;
    },
    hideMessage: (state) => {
      state.error = true;
      state.message = "";
      state.visible = false;
    },
  },
});

export const { displayMessage, hideMessage } = actions;
export default reducer;
