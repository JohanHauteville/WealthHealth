import logo from "../../assets/img/create-employee.png";
import "./styles.scss";
import Modal from "../../components/Modal";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import { DEPARTMENT_LIST, STATES_LIST } from "../../utils/constants";
import DatePicker from "../../components/DatePicker";
import { checkInput, getProfile } from "./functions";
import { useDispatch } from "react-redux";
import * as employeeActions from "../../features/employees";

function CreateEmployee() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState(true);
  const defaultNameDepartment = "Select a department";
  const defaultNameState = "Select a State";

  const dispatch = useDispatch();
  function saveEmployee() {
    dispatch(employeeActions.add(getProfile()));
  }

  function handleSubmit() {
    if (
      checkInput("first-name", "NAME") &&
      checkInput("last-name", "NAME") &&
      checkInput("city", "NAME") &&
      checkInput("street", "STREET") &&
      checkInput("date-of-birth", "DATE") &&
      checkInput("start-date", "DATE") &&
      checkInput("zip-code", "ZIPCODE") &&
      checkInput("department", "NAME", defaultNameDepartment, true) &&
      checkInput("state", "NAME", defaultNameState, true)
    ) {
      saveEmployee();
      setModalError(false);
      setModalMessage("Employee added !");
      setModalVisible(true);
    } else {
      setModalError(true);
      setModalMessage("Please correctly fill all inputs");
      setModalVisible(true);
    }
  }

  return (
    <>
      <main className="page">
        <section className="create-form-container">
          <div className="create-form-container__left-side">
            <h1>HRnet</h1>
            <img src={logo} alt="logo wealth health" />
            <p>Powered by Wealth Health ©</p>
          </div>
          <div className="create-form-container__right-side">
            <h2>Create Employee</h2>
            <form action="#" className="create-form">
              <label htmlFor="first-name">First Name</label>

              <input
                type="text"
                id="first-name"
                onBlur={() => checkInput("first-name", "NAME")}
              />

              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                onBlur={() => checkInput("last-name", "NAME")}
              />

              <label htmlFor="date-of-birth">Date of Birth</label>
              <DatePicker id="date-of-birth" majority={true} />

              <label htmlFor="start-date">Start Date</label>
              <DatePicker id="start-date" />

              <fieldset className="form-address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  type="text"
                  onBlur={() => checkInput("street", "STREET")}
                />

                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  onBlur={() => checkInput("city", "NAME")}
                />

                <label htmlFor="state">State</label>
                {/* <select name="state" id="state"></select> */}
                <Dropdown
                  name="state"
                  defaultName={defaultNameState}
                  itemList={STATES_LIST}
                />

                <label htmlFor="zip-code">Zip Code</label>
                <input
                  id="zip-code"
                  type="number"
                  onBlur={() => checkInput("zip-code", "ZIPCODE")}
                />
              </fieldset>
              <label htmlFor="department">Department</label>
              <Dropdown
                name="department"
                defaultName={defaultNameDepartment}
                itemList={DEPARTMENT_LIST}
              />
            </form>
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
          <Modal
            visible={modalVisible}
            setVisible={() => setModalVisible()}
            message={modalMessage}
            error={modalError}
          />
        </section>
      </main>
    </>
  );
}

export default CreateEmployee;
