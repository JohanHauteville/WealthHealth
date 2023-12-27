import logo from "../../assets/img/create-employee.png";
import "./styles.scss";
import Modal from "../../components/Modal";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import { DEPARTMENT_LIST, STATES_LIST } from "../../utils/constants";
import DatePicker from "../../components/DatePicker";

function CreateEmployee() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [departmentValue, setDepartmentValue] = useState(DEPARTMENT_LIST[0]);
  // const [birthDate, setBirthDate] = useState("");
  const [stateValue, setStateValue] = useState(STATES_LIST[0].abbreviation);
  const [modalVisible, setModalVisible] = useState(false);

  function saveEmployee(e) {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;

    console.log("FirstName: " + firstName);
    console.log("LastName: " + lastName);
    console.log("Department: " + departmentValue);
    console.log("State: " + stateValue);
    // console.log("BirthDate: " + birthDate);
    const birthDate = document.getElementById("date-of-birth").innerHTML;
    const startDate = document.getElementById("start-date").innerHTML;
    // console.log(document.getElementById("first-name"));
    console.log("BirthDate: " + birthDate);
    console.log("Start Date: " + startDate);

    setModalVisible(true);
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

              <input type="text" id="first-name" />

              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" />

              <label htmlFor="date-of-birth">Date of Birth</label>
              {/* <input id="date-of-birth" type="text" /> */}
              <DatePicker
                id="date-of-birth"
                majority={true}
                // setValue={() => setBirthDate()}
              />

              <label htmlFor="start-date">Start Date</label>
              {/* <input id="start-date" type="text" /> */}
              <DatePicker id="start-date" />

              <fieldset className="form-address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <input id="street" type="text" />

                <label htmlFor="city">City</label>
                <input id="city" type="text" />

                <label htmlFor="state">State</label>
                {/* <select name="state" id="state"></select> */}
                <Dropdown
                  defaultName="Select a State"
                  name="state"
                  itemList={STATES_LIST}
                  onChange={setStateValue}
                />

                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" type="number" />
              </fieldset>
              <label htmlFor="department">Department</label>
              <Dropdown
                defaultName="Select a department"
                name="department"
                itemList={DEPARTMENT_LIST}
                onChange={setDepartmentValue}
              />
            </form>
            {/* <button>Save</button> */}
            <button onClick={saveEmployee}>Save</button>
          </div>
          <Modal
            visible={modalVisible}
            setVisible={() => setModalVisible()}
            message={"Ceci est le message de la modale"}
            error={false}
          />
          {/* <div id="confirmation" class="modal">
            Employee Created!
          </div> */}
        </section>
      </main>
    </>
  );
}

export default CreateEmployee;
