import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import { APP_ROUTES } from "./utils/constants";

import CreateEmployee from "./pages/CreateEmployee";
import Error from "./pages/Error";
import EmployeesList from "./pages/EmployeesList";

import Header from "./components/Header";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path={APP_ROUTES.CREATE_EMPLOYEE} element={<CreateEmployee />} />
        <Route path={APP_ROUTES.HOME} element={<EmployeesList />} />
        <Route path={APP_ROUTES.ERROR} element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
