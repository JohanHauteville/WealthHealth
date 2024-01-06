import logo from "../../assets/img/create-employee.png";
import "./styles.scss";
import { DEPARTMENT_LIST, STATES_LIST } from "../../utils/constants";
import Modal from "../../components/Modal";
import Dropdown from "../../components/Dropdown";
import DatePicker from "../../components/DatePicker";
import { checkInput, getProfile } from "./functions";
import { useDispatch, useSelector } from "react-redux";

import * as employeeActions from "../../features/employees";
import * as modalActions from "../../features/modal";

function CreateEmployee() {
  const { visible, message, error } = useSelector((state) => state.modal);
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
      checkInput("date-of-birth", "DATE", "", true) &&
      checkInput("start-date", "DATE", "", true) &&
      checkInput("zip-code", "ZIPCODE") &&
      checkInput("department", "NAME", defaultNameDepartment, true) &&
      checkInput("state", "NAME", defaultNameState, true)
    ) {
      saveEmployee();
      dispatch(
        modalActions.displayMessage({
          message: "Employee added !",
          visible: true,
          error: false,
        })
      );
    } else {
      dispatch(
        modalActions.displayMessage({
          message: "Please correctly fill all inputs",
          visible: true,
          error: true,
        })
      );
    }
  }

  return (
    <>
      <main className="page">
        <Modal
          visible={visible}
          message={message}
          error={error}
          closeLink={error ? null : "./"}
        />
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
              <div className="create-form__input">
                <input
                  type="text"
                  id="first-name"
                  onBlur={() => checkInput("first-name", "NAME")}
                />
                <div className="test-error"></div>
              </div>

              <label htmlFor="last-name">Last Name</label>
              <div className="create-form__input">
                <input
                  type="text"
                  id="last-name"
                  onBlur={() => checkInput("last-name", "NAME")}
                />
                <div className="test-error"></div>
              </div>

              <label>Date of Birth</label>
              <div className="create-form__input">
                <DatePicker id="date-of-birth" majority={true} />
                <div className="test-error"></div>
              </div>

              <label>Start Date</label>
              <div className="create-form__input">
                <DatePicker id="start-date" />
                <div className="test-error"></div>
              </div>

              <fieldset className="form-address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <div className="create-form__input">
                  <input
                    id="street"
                    type="text"
                    onBlur={() => checkInput("street", "STREET")}
                  />
                  <div className="test-error"></div>
                </div>

                <label htmlFor="city">City</label>
                <div className="create-form__input">
                  <input
                    id="city"
                    type="text"
                    onBlur={() => checkInput("city", "NAME")}
                  />
                  <div className="test-error"></div>
                </div>

                <label>State</label>
                <div className="create-form__input">
                  <Dropdown
                    name="state"
                    defaultName={defaultNameState}
                    itemList={STATES_LIST}
                  />
                  <div className="test-error"></div>
                </div>

                <label htmlFor="zip-code">Zip Code</label>
                <input
                  id="zip-code"
                  type="number"
                  onBlur={() => checkInput("zip-code", "ZIPCODE")}
                />
              </fieldset>
              <label>Department</label>
              <div className="create-form__input">
                <Dropdown
                  name="department"
                  defaultName={defaultNameDepartment}
                  itemList={DEPARTMENT_LIST}
                />
                <div className="test-error"></div>
              </div>
            </form>
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default CreateEmployee;
