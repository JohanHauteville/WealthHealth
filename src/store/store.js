import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees";
import modalReducer from "../features/modal";

export default configureStore({
  reducer: {
    listOfEmployees: employeesReducer,
    modal: modalReducer,
  },
});
