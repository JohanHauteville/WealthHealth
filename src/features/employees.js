import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "employees",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { add } = actions;
export default reducer;
