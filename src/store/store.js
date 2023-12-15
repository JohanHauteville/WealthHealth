import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees";

export default configureStore({
  reducer: {
    listOfEmployees: employeesReducer,
  },
});
