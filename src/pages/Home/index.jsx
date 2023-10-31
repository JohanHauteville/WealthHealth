import logo from "../../assets/img/create-employee.png";
import "./styles.scss";
import Modal from "../../components/Modal";

function Home() {
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
              <input id="date-of-birth" type="text" />

              <label htmlFor="start-date">Start Date</label>
              <input id="start-date" type="text" />

              <fieldset className="form-address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <input id="street" type="text" />

                <label htmlFor="city">City</label>
                <input id="city" type="text" />

                <label htmlFor="state">State</label>
                <select name="state" id="state"></select>

                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" type="number" />
              </fieldset>
              <label htmlFor="department">Department</label>
              <select name="department" id="department">
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
              </select>
            </form>
            <button>Save</button>
            {/* <button onClick="saveEmployee()">Save</button> */}
          </div>
          <Modal
            visible={false}
            message={"Ceci est le message de la modale"}
            error={true}
          />
          {/* <div id="confirmation" class="modal">
            Employee Created!
          </div> */}
        </section>
      </main>
    </>
  );
}

export default Home;
